# Seção 05 — DevOps
> iit-ui | Panorama Estratégico 2026-06-05

---

## 1. CI/CD Pipeline — Situação Atual

O repositório possui dois workflows distintos em `.github/workflows/`:

**`ci.yml` — Build & Push Storybook**

Trigger: `push` e `pull_request` em `main`. O pipeline executa em sequência:
1. Checkout + setup Node 20 com cache npm
2. `npm ci`
3. `npm run build-storybook` — build do site Storybook estático
4. Login no GHCR
5. `docker/metadata-action` — gera tags `branch`, `sha-<7chars>`, `latest`
6. `docker/build-push-action` — build + push da imagem nginx com o Storybook
7. **Step falho:** `sed -i "s|image: ghcr.io/apsferreira/iit-ui:.*|...|" k8s/deployment.yaml` (`ci.yml:66`)

O step 7 é o problema central (Issue #22): o diretório `k8s/` foi removido no commit `d8247d9` ("chore: remove manifests K8s do storybook — deployment deletado do cluster"), mas o step permanece no workflow. Em todo `push` para `main`, a condição `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` é satisfeita, o `sed` falha com código de saída não-zero porque o arquivo-alvo não existe, e o job termina com erro. A imagem Docker pode ou não ter sido pushed antes do erro — depende da ordem de execução e do flag `continue-on-error` ausente. O resultado é: **CI sinalizando falha em 100% dos pushes para main desde `d8247d9`**.

Adicionalmente, o CI não executa `npm test` nem `npm run lint` em nenhum ponto (Issue #24). O fluxo vai direto de `npm ci` para `build-storybook`. Testes com falsos negativos conhecidos (ver seção de testes da Seção 06) passam sem detecção.

**`publish-npm.yml` — Publicação GitHub Packages**

Trigger: tag `v*.*.*` ou `workflow_dispatch` com input de versão. Publica `@iit/ui` em `npm.pkg.github.com`. O workflow:
1. Checkout + setup Node 20 com registry `https://npm.pkg.github.com` e scope `@iit`
2. `npm ci`
3. `npm run build` — compila `dist/` via `tsc && vite build`
4. (condicional) `npm version ${{ github.event.inputs.version }} --no-git-tag-version` para `workflow_dispatch`
5. `npm publish` com `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

O workflow também não executa testes antes de publicar (`publish-npm.yml:35-45`). Um pacote com regressões pode ser publicado e consumido pelos produtos downstream.

---

## 2. Publicação NPM — Registro e Versionamento

O pacote está em `v0.1.0` (`package.json:3`) desde a criação. Não existem tags git no repositório (verificado via `git tag`), portanto **nenhuma release formal foi publicada via tag**. A publicação só pode ter ocorrido via `workflow_dispatch`, o que é manual e não auditável pelo histórico de commits.

Problemas de versionamento identificados:

- **Sem CHANGELOG.md** — não existe arquivo de changelog. Consumidores não têm como saber o que mudou entre versões sem ler commits.
- **Sem automação semântica** — nenhum `changesets`, `semantic-release` ou `standard-version` configurado. O bump de versão é manual (`npm version` no workflow ou direto no `package.json`).
- **Sem política de breaking changes documentada** — o `CONTEXT.md` define que `@iit/ui` é leaf dependency consumida por todos os frontends IIT, mas não existe convenção de quando bumpar major. O projeto está em `0.x`, o que tecnicamente permite breaking changes sem major bump, mas não há acordo explícito.
- **`workflow_dispatch` com version input** (`publish-npm.yml:9-11`) permite bump manual divergente da tag — se alguém acionar o dispatch com version `0.2.0` sem criar a tag correspondente, o git e o registry ficam dessincronizados.

---

## 3. Issues Conhecidas — Análise de Causa Raiz

### Issue #22 — CI Quebrado (k8s deletado)

**Causa:** O Storybook foi originalmente deployado no K3s via manifests em `k8s/`. O commit `d8247d9` removeu os manifests do repo, mas o step em `ci.yml:62-71` que atualiza o `k8s/deployment.yaml` com a nova SHA da imagem não foi removido junto. O step executa `git add k8s/deployment.yaml` em arquivo inexistente, o `git diff --staged --quiet` retorna true (nada staged) e o commit não é criado — mas o `sed -i` anterior já falhou com exit code 1.

**Impacto atual:** A imagem Storybook continua sendo built e pushed para GHCR (steps 4-6 concluem antes do step 7). O site Storybook não está sendo servido em nenhum endpoint K3s — deployment deletado, sem replacement configurado.

**Risco associado:** O job CI falha em toda push para `main`. PRs com CI mandatório não podem ser mergeados. Qualquer proteção de branch que exija CI verde está efetivamente bloqueando merges — ou a proteção foi desativada, deixando `main` sem gate.

### Issue #24 — CI sem Testes

**Causa:** O `ci.yml` foi criado com foco exclusivo em build e push da imagem Storybook. Os scripts `test` e `lint` existem no `package.json:35-36` mas nunca foram adicionados ao workflow.

**Impacto atual:** Falsos negativos nos testes (classes CSS incorretas em `Button.test.tsx:33` e `Badge.test.tsx:13`, documentados na Seção 06) existem sem detecção automática. Qualquer regressão de componente que quebre testes passa pelo CI sem alerta.

---

## 4. Versionamento e Breaking Changes

A biblioteca está posicionada como **leaf dependency** do ecossistema — todos os frontends IIT a consomem, nenhum a produz (`CONTEXT.md:41`). Isso significa que um breaking change não-sinalizado em `@iit/ui` pode quebrar `iit-ui` → SocialMake, focus-hub, my-library, auth-service frontend, iit-ui simultaneamente.

**Estado atual do versionamento:**
- `package.json:3`: `"version": "0.1.0"` — sem histórico de bumps rastreável
- Nenhuma tag git criada: `git tag` retorna vazio
- Nenhum arquivo `CHANGELOG.md` no repositório
- `Introduction.stories.tsx` referencia `v0.1.0` hardcoded — não sincronizado automaticamente

**Riscos de breaking change não gerenciados:**

1. Renomear props de componentes (ex: `isLoading` → `loading` em Button) quebraria todos os consumers silenciosamente em TypeScript se a versão não bumpar major
2. Alterar tokens de cor (ex: renomear `brand.primary` → `brand.iitBlue`) quebraria temas derivados
3. Modificar o `tailwind.config.ts` exportado como preset pode quebrar builds de apps consumers que usam `@iit/ui/tailwind`

O risco é amplificado pela ausência de testes de integração cross-repo — não há smoke test que consuma `@iit/ui` de um app real e valide que o build funciona.

---

## 5. Integração com Produtos Consumidores

O `CONTEXT.md:41` declara: "Downstream: todos os frontends do ecossistema IIT que declaram `@iit/ui` como dependência". O mecanismo de consumo é via GitHub Packages (`npm.pkg.github.com`, scope `@iit`).

**Fluxo atual (esperado):**
```
iit-ui → npm publish → GitHub Packages (@iit/ui@0.x.x)
           ↓
SocialMake / focus-hub / my-library / auth-service-frontend
  npm install @iit/ui → consome do registry
```

**Problemas na cadeia de consumo identificados:**

- **Sem automação de propagação** — quando `@iit/ui` publica nova versão, os consumers não são notificados nem atualizam automaticamente. Dependabot poderia ser configurado nos repos consumers para detectar bumps no GitHub Packages, mas isso exige configuração individual em cada repo.
- **`@iit/ui/tailwind` exporta fonte TypeScript** (`package.json:18`: `"./tailwind": "./tailwind.config.ts"`). Consumers que não suportem `.ts` diretamente em configurações de bundler terão falha no import do preset.
- **`class-variance-authority`, `clsx` e `tailwind-merge` não são externalizados no build** (`vite.config.ts` auditado). Essas dependências são bundleadas no `dist/index.js`, aumentando o bundle dos consumers e criando risco de conflito de versão se o consumer já tiver `clsx` v1 enquanto `@iit/ui` bundleia `clsx` v2.
- **Registry exclusivo GitHub Packages** — consumers precisam de `.npmrc` com `@iit:registry=https://npm.pkg.github.com` e token de autenticação. CI de cada produto downstream precisa de `secrets.GITHUB_TOKEN` ou PAT com permissão de leitura de packages. Sem documentação centralizada desse requisito.
- **Versão `0.1.0` congelada** — se nenhuma tag foi criada e `workflow_dispatch` não foi acionado, o registry pode estar vazio ou com uma única publicação manual sem rastreabilidade.

---

## Top 5 Movimentos

### M1 — Corrigir CI Quebrado (Issue #22) [Risco: BAIXO | Impacto: CRÍTICO]

**O que:** Remover o step `Update deployment image tag` de `ci.yml:62-71` (referência morta a `k8s/deployment.yaml`). O Storybook não tem mais deployment K3s ativo. Se houver plano de redeployar, criar `k8s/deployment.yaml` antes de reativar o step.

**Critério de aceite:**
- `ci.yml` não contém referência a `k8s/deployment.yaml`
- Push para `main` resulta em job verde
- Nenhum step executa `sed` ou `git commit` desnecessário

### M2 — Adicionar `npm test` e `npm run lint` ao CI (Issue #24) [Risco: BAIXO | Impacto: ALTO]

**O que:** Adicionar steps de teste e lint ao `ci.yml` antes do `Build Storybook`. Adicionar `npm test` ao `publish-npm.yml` antes do `npm publish`. Configurar `@vitest/coverage-v8` com threshold de 80% em `vitest.config.ts`.

**Critério de aceite:**
- `ci.yml` executa `npm run lint` e `npm test` — falhas bloqueiam push da imagem
- `publish-npm.yml` executa `npm test` — falhas bloqueiam publicação
- `vitest.config.ts` declara `coverage.thresholds: { lines: 80, branches: 80 }`
- CI verde no próximo push (após corrigir os falsos negativos de Button e Badge)

### M3 — Implementar Versionamento Semântico com Changesets [Risco: BAIXO | Impacto: ALTO]

**O que:** Instalar `@changesets/cli`, configurar `.changeset/config.json` com `changelog: @changesets/changelog-github`, adicionar workflow `release.yml` que executa `changeset version` + `changeset publish` ao mergar para `main` com changesets pendentes. Criar `CHANGELOG.md` inicial.

**Critério de aceite:**
- `CHANGELOG.md` existe e é atualizado automaticamente no publish
- Tag git `v0.x.x` é criada automaticamente no publish
- PR de breaking change exige changeset do tipo `major`
- `Introduction.stories.tsx` lê versão de `package.json` em vez de hardcode

### M4 — Externalizar Dependências no Build Vite [Risco: BAIXO | Impacto: MÉDIO]

**O que:** Configurar `vite.config.ts` para marcar `class-variance-authority`, `clsx` e `tailwind-merge` como `external` no modo library. Mover essas três dependências de `dependencies` para `peerDependencies` no `package.json`. Corrigir export `"./tailwind"` para apontar para arquivo `.js` compilado ou `.cjs`, não `.ts`.

**Critério de aceite:**
- `dist/index.js` não inclui código de `cva`, `clsx` ou `tailwind-merge` (verificável via `npm pack` + inspeção)
- `package.json` lista as três como `peerDependencies`
- `import { tailwindPreset } from '@iit/ui/tailwind'` funciona em projeto consumer com bundler padrão (Vite, Next.js)

### M5 — Documentar e Automatizar Integração com Consumers [Risco: BAIXO | Impacto: MÉDIO]

**O que:** Criar `docs/CONSUMING.md` com instrução completa de `.npmrc`, token de autenticação e exemplo de `tailwind.config` do consumer. Configurar Dependabot nos repos consumers (`SocialMake`, `focus-hub`, `my-library`) para detectar bumps em `@iit/ui` no GitHub Packages. Adicionar smoke test de build (`npm run build`) em pelo menos um consumer como job de validação cross-repo no CI do `iit-ui`.

**Critério de aceite:**
- `docs/CONSUMING.md` existe com instrução reproduzível (testada em repo limpo)
- Dependabot ativo em pelo menos 3 repos consumers para `npm` scope `@iit`
- CI do `iit-ui` inclui job opcional `smoke-test` que clona `iit-ui-smoke` e executa `npm install @iit/ui && npm run build`

---

_Lente: DevOps | iit-ui | Auditoria 2026-06-05_
