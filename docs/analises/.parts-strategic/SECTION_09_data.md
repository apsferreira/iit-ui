# Seção 09 — Data & Analytics
> iit-ui | Panorama Estratégico 2026-06-05

---

## 1. Bundle Size — Situação Atual

**Tracking:** ausente. Não existe `size-limit`, `bundlesize` ou qualquer gate de tamanho configurado no repositório. O `package.json` não declara script de verificação de tamanho. O diretório `dist/` não existe no working tree (biblioteca ainda não foi buildada localmente ou o artefato não está comitado), o que impede medição direta.

**Proxy disponível:** storybook-static buildado. O maior asset JS individual é `globals-runtime.js` com 1,4 MB — mas esse número é irrelevante para o bundle da biblioteca em si, pois inclui toda a infra do Storybook.

**O que sabemos sobre o bundle real:**

- A biblioteca usa `vite build --lib` com formato `es` e externaliza apenas `react`, `react-dom` e `react/jsx-runtime`
- `class-variance-authority`, `clsx` e `tailwind-merge` são `dependencies` (não `peerDependencies`), portanto **são bundleadas junto com a biblioteca**. Isso aumenta o peso final para consumidores que já possuem essas libs — e todos os projetos do ecossistema IIT as possuem, pois usam Tailwind
- Sem tree-shaking documentado por componente: o consumidor que importa apenas `Button` pode receber o bundle inteiro dependendo de como o bundler do produto resolve o entry point `dist/index.js`

**Risco:** sem gate de bundle size no CI, um componente pesado pode ser adicionado sem alerta. Drift silencioso.

---

## 2. Métricas de Adoção — Componentes por Produto

A auditoria mapeou dois produtos com frontends ativos: `my-library` e `focus-hub`. Ambos usam componentes com spec derivada do `@iit/ui`, mas **nenhum consome o pacote publicado diretamente** — `my-library` mantém wrappers locais em `src/components/ui/` e `focus-hub` não declara `@iit/ui` no seu `package.json`.

**Situação descoberta:** os arquivos `Button.tsx`, `Card.tsx`, `Badge.tsx` e `Input.tsx` em `my-library/frontend/src/components/ui/` são reimplementações locais com comentários explícitos referenciando a spec do `@iit/ui`, mas sem importar o pacote. A biblioteca funciona como **referência de design, não como dependência de runtime**.

**Mapa de adoção real (contagem de ocorrências nos dois produtos):**

| Componente | my-library | focus-hub | Total | Situação |
|------------|-----------|-----------|-------|----------|
| Card | 10 | 67 | 77 | Mais usado; local duplicate em my-library |
| Button | 13 | 47 | 60 | Alto uso; local duplicate em my-library |
| Modal | 8 | 3 | 11 | Uso moderado |
| Badge | 5 | 3 | 8 | Baixo uso |
| EmptyState | 2 | 4 | 6 | Baixo uso |
| Input | 3 | 3 | 6 | Baixo uso |
| Textarea | 0 | 2 | 2 | Quase ausente |
| Select | 0 | 0 | 0 | Zero adoção |
| Skeleton | 0 | 0 | 0 | Zero adoção |

**Conclusão crítica:** os dois componentes mais usados no ecossistema (Card, Button) existem como duplicatas locais em `my-library`. A biblioteca não está sendo consumida como pacote — está sendo copiada como referência. Isso invalida qualquer pressuposto de que atualizações no `@iit/ui` propagam para os produtos.

**Único consumidor real do pacote:** `iit-agents/frontend-react` referencia `@iit/ui` via `file:../../packages/iit-ui` (path relativo que pode não resolver dependendo do layout de diretórios da máquina).

---

## 3. Performance — Memoização e Re-renders

Nenhum componente usa `React.memo`, `useMemo` ou `useCallback`. A análise do código fonte confirma:

- `Button`, `Card`, `Badge`, `Skeleton`: `React.forwardRef` simples sem memoização — adequado para componentes primitivos que não fazem cálculo pesado
- `Modal`: dois `useEffect` (focus trap + scroll lock) sem dependências problemáticas — performático para o padrão de uso esperado
- `EmptyState`: componente funcional simples, sem estado interno
- `Textarea`: único com estado local (`count` para contador de caracteres) — `useState` correto, sem re-render desnecessário identificado

**Avaliação:** para uma biblioteca de primitivos UI, a ausência de `React.memo` é aceitável e até preferível (evita overhead de comparação desnecessário em componentes simples). O risco de re-render está nos consumidores, não na biblioteca.

**Exceção a monitorar:** `Modal` usa `document.addEventListener('keydown')` dentro de `useEffect`. Se o componente for renderizado frequentemente (ex: toggling rápido), o cleanup está implementado corretamente (`return () => document.removeEventListener`). Sem issue aqui.

---

## 4. Acessibilidade como Métrica

Auditoria por componente (produção, excluindo `.stories.` e `.test.`):

| Componente | aria presentes | Avaliação |
|------------|---------------|-----------|
| Modal | 6 (`role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`, `aria-hidden` overlay, `aria-label` close btn) | Excelente — WAI-ARIA 1.2 compliant |
| Input | 2 (`aria-invalid`, `aria-describedby`) + `role="alert"` no erro | Bom |
| Select | 2 (`aria-invalid`, `aria-describedby`) + `role="alert"` | Bom |
| Textarea | 2 (`aria-invalid`, `aria-describedby`) + `role="alert"` | Bom |
| EmptyState | 1 (`role="status"`, `aria-label`) + `aria-hidden` no ícone | Bom |
| Button | 1 (`aria-busy` no loading) + `aria-hidden` no spinner SVG | Adequado |
| Badge | 1 (`aria-hidden` no dot) | Adequado |
| Skeleton | 1 (`aria-hidden="true"`) | Correto — loading placeholder não deve ser anunciado |
| Card | 0 | Intencionalmente semântico via HTML nativo |

**Score de acessibilidade: 8/9 componentes (89%) com pelo menos um atributo aria correto.** Card é o único sem aria explícito — justificável por ser um container genérico que herda semântica do conteúdo filho.

**Gap identificado:** Modal usa `role="dialog"` via `div`, não o elemento nativo `<dialog>`. Isso significa que o focus trap é implementado manualmente (e está correto no código), mas consumidores precisam garantir que o Modal não está dentro de outro elemento com `aria-hidden`. Esse padrão é funcional mas adiciona complexidade de manutenção versus `<dialog>` nativo.

**Ponto positivo:** `@storybook/addon-a11y` está instalado como devDependency — existe infraestrutura para detectar violações durante desenvolvimento, mas não há evidência de que os checks de acessibilidade estejam sendo executados no CI.

---

## 5. Breaking Changes Tracking

**CHANGELOG:** não existe. Nenhum arquivo `CHANGELOG.md`, `CHANGELOG` ou `RELEASES.md` foi encontrado no repositório.

**semantic-release:** não configurado. Não há `.releaserc`, `release.config.js` ou menção a `@semantic-release/*` nas dependências.

**Versionamento atual:** `package.json` declara `"version": "0.1.0"` — não houve nenhum release formal. O pacote está publicado no GitHub Packages (`publishConfig.registry: https://npm.pkg.github.com`) mas sem automação de versão.

**Risco prático:** sem CHANGELOG, qualquer breaking change no `@iit/ui` (renomear prop, remover variante, alterar tipo) é invisível para consumidores. Como `my-library` usa wrappers locais, esse risco está parcialmente mitigado — mas se e quando os produtos migrarem para consumo direto do pacote, a ausência de semver disciplinado causará quebras silenciosas.

**Inexistência de migration guides:** sem histórico de breaking changes documentado, uma migração `0.1.x → 0.2.x` exigiria leitura de diff de git — não escalável.

---

## 6. North Star Metric para iit-ui

A pergunta central para uma design system library é: **ela está acelerando o desenvolvimento ou criando divergência?**

**NSM proposta:**

> **% de componentes UI dos produtos IIT que usam @iit/ui como dependência de runtime (não como referência/cópia)**

**Estado atual:** 0% — nenhum produto consome o pacote publicado de forma validável.

**Meta para milestone:** ≥ 60% das páginas dos produtos principais (my-library, focus-hub) renderizando componentes que vêm do pacote, não de duplicatas locais.

**Métricas de suporte:**

| Métrica | Frequência | Fonte |
|---------|-----------|-------|
| Número de componentes no catálogo | Semanal | git |
| Produtos com `@iit/ui` no package.json (runtime) | Por release | git / npm registry |
| % de componentes com teste de regressão funcional | Por PR | Vitest coverage |
| Bundle size gzipped do dist/index.js | Por release | size-limit no CI |
| Issues de breaking change reportadas por produto | Mensal | GitHub Issues |

A NSM de adoção como dependência de runtime é o único sinal que valida que a biblioteca entrega valor real versus ser um documento de referência de design.

---

## Top 5 Movimentos

### Movimento 1 — Externalizar CVA + clsx + tailwind-merge como peerDependencies
**O que:** mover `class-variance-authority`, `clsx` e `tailwind-merge` de `dependencies` para `peerDependencies`. Todos os projetos IIT já os usam.
**Por que:** reduz bundle duplicado nos consumidores. Cada produto que usa iit-ui bundeia essas libs duas vezes hoje.
**Critério de aceite:** `npm pack` gera um tarball onde `dependencies` está vazio; consumidores não recebem erro de peer.
**Esforço:** 1h. **Responsável:** @frontend.

### Movimento 2 — Configurar size-limit no CI com gate de 10 KB gzipped
**O que:** adicionar `size-limit` como devDependency com config: `[{ "path": "dist/index.js", "limit": "10 kB" }]`. Integrar ao CI como step antes de publish.
**Por que:** sem gate, nenhum alerta impede que um componente pesado entre no bundle. 10 KB é conservador para 9 componentes primitivos; serve como linha de base real após o primeiro build limpo.
**Critério de aceite:** PR que excede o limite falha no CI com mensagem de diff de tamanho.
**Esforço:** 2h (setup + primeira medição real para ajustar threshold). **Responsável:** @devops.

### Movimento 3 — Migrar my-library para consumir @iit/ui como pacote (Button e Card primeiro)
**O que:** adicionar `@iit/ui` ao `package.json` de `my-library/frontend`, remover `src/components/ui/Button.tsx` e `src/components/ui/Card.tsx` locais, importar diretamente do pacote. Iniciar pelos dois componentes de maior adoção (60 + 77 ocorrências).
**Por que:** enquanto os produtos mantêm cópias locais, qualquer correção no `@iit/ui` (bugs de acessibilidade, token update) não propaga. A NSM permanece em 0%.
**Critério de aceite:** `grep -r "from.*components/ui/Button"` retorna zero resultados em my-library; testes passam.
**Esforço:** 4h (migração + ajuste de props backward-compat). **Responsável:** @frontend + @pm para priorização.

### Movimento 4 — Implementar CHANGELOG automatizado com conventional commits
**O que:** configurar `semantic-release` ou ao menos `conventional-changelog-cli` com hook de pre-publish. Definir convenção de commit (`feat:`, `fix:`, `BREAKING CHANGE:`) e gerar `CHANGELOG.md` na raiz.
**Por que:** sem CHANGELOG, consumidores não sabem o que mudou entre versões. Impossível planejar migração segura de 0.1.x para 0.2.x.
**Critério de aceite:** `CHANGELOG.md` gerado automaticamente no CI ao criar tag; inclui seção "BREAKING CHANGES" quando aplicável.
**Esforço:** 3h. **Responsável:** @devops.

### Movimento 5 — Dashboard de adoção via grep semanal no CI (proxy de analytics)
**O que:** script bash no CI de `iit-ui` que faz checkout dos repos de produto e conta ocorrências de cada componente importado do pacote versus wrappers locais. Resultado salvo como artifact JSON e exibido no Storybook como "Adoption" tab.
**Por que:** sem instrumentação, a lente Data não tem visibilidade de adoção em tempo real. Não é possível saber se um componente foi adotado ou abandonado sem grep manual.
**Critério de aceite:** JSON estruturado disponível após cada CI run com campos `component`, `product`, `import_count`, `source` (package | local | none).
**Esforço:** 4h (script + integração CI + Storybook page). **Responsável:** @data + @devops.

---

**Score Data atual: 4/10** — infraestrutura de observabilidade inexistente. Nenhum tracking de bundle, zero analytics de adoção, sem CHANGELOG, sem automação de versão. Acessibilidade é o único ponto positivo mensurável (89% de componentes com aria correto). O estado de adoção real (0% de consumo como pacote) é o dado mais crítico e demanda ação imediata antes de qualquer feature nova.
