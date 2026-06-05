# PANORAMA ESTRATÉGICO — iit-ui
> Data: 2026-06-05 | Sweep SDD v2 (11 lentes) | Score: **41/110 (37%)**

## TL;DR Executivo

iit-ui é a biblioteca de componentes UI compartilhada do ecossistema IIT — 9 componentes React (Button, Badge, Card, Input, Textarea, Select, Modal, Skeleton, EmptyState), design tokens, Storybook 8 e suporte React Native. A fundação técnica existe, mas **zero produtos IIT consomem `@iit/ui` como dependência real**: focus-hub reimplementou Button/Input/Modal/Card localmente (1.500 LOC duplicados), SocialMake não usa a lib, my-library aguarda Pagination que não existe. O export map declara um subpath `./tokens` que nunca é gerado pelo build (bug crítico que quebra qualquer consumidor que tente importar tokens). Testes têm falsos negativos garantidos em Button e Badge. CI executa `build-storybook` mas nunca `npm test`. O serviço existe em isolamento — investimento sem retorno até ser adotado pelos produtos.

---

## Score por Dimensão

| Dimensão | Score | Max | Observação |
|----------|-------|-----|-----------|
| Segurança (OWASP) | 8 | 20 | Sem backend/API; vulnerabilidades em devDeps apenas (21 CVEs, zero em prod) |
| Arquitetura & Código | 6 | 15 | CVA + Tailwind corretos; Skeleton hardcoded dark-only; Modal animação quebrada |
| Testes & QA | 3 | 15 | 9 componentes com testes mas falsos negativos em Button/Badge; CI não executa testes |
| CI/CD | 2 | 10 | CI quebrado desde commit d8247d9 (step k8s deletado); sem publish automático |
| Observabilidade | 3 | 10 | Storybook funcional; sem Chromatic; sem bundle size tracking |
| Produto (PM) | 5 | 10 | 9 componentes entregues; zero adoção nos produtos IIT; Toast/Pagination/DatePicker ausentes |
| IA | 4 | 10 | Oportunidades identificadas (geração variantes, docs auto); nenhuma implementada |
| LGPD/Legal | 4 | 10 | Stack 100% MIT; sem arquivo LICENSE; acessibilidade ~50% WCAG 2.1 |
| Data & Analytics | 3 | 5 | Sem bundle size tracking; sem métricas de adoção |
| Finance | 3 | 5 | ROI negativo atualmente; migração para shadcn/ui puro = R$36k economia em 2026 |
| Growth/CS | 0 | 5 | Zero adoção nos produtos; sem Storybook público; sem docs de onboarding |
| **TOTAL** | **41** | **110** | |

---

## Bugs Críticos — P0/P1

### [P0-1] Export `./tokens` quebrado — arquivo nunca gerado pelo build
**Arquivo:** `package.json:16` + `vite.config.ts:13`

```json
"./tokens": {
  "react-native": "./src/tokens/index.ts",
  "import": "./dist/tokens/index.js"
}
```

`vite.config.ts` define entry único (`src/index.ts`) sem `preserveModules`. Com rollup em single-entry, só `dist/index.js` é gerado — `dist/tokens/index.js` **nunca existe**. Qualquer consumidor que faça `import { colors } from '@iit/ui/tokens'` recebe `Cannot find module` em runtime. Subpath completamente quebrado.

**Fix:** adicionar `preserveModules: true, preserveModulesRoot: 'src'` no `rollupOptions`, ou segundo entry point dedicado.

---

### [P0-2] Skeleton invisível em light mode — cor hardcoded dark-only
**Arquivo:** `src/components/Skeleton/Skeleton.tsx:6`

```ts
const skeletonVariants = cva('animate-pulse bg-[#1E1E28]')
```

`#1E1E28` é cinza escuro — contraste próximo a zero sobre `#FFFFFF`. `tailwind.config.ts:12` define `darkMode: 'class'` (light-first). Todo consumidor sem `.dark` na raiz vê Skeleton invisível.

**Fix:** `bg-[#E5E7EB] dark:bg-[#1E1E28]`

---

### [P0-3] Falsos negativos garantidos em testes de Button e Badge
**Arquivo:** `src/components/Button/Button.test.tsx:33` e `src/components/Badge/Badge.test.tsx:12`

```ts
// Button.test.tsx:33 — implementação usa text-red-600, não text-red-400
expect(btn.className).toContain('text-red-400')

// Badge.test.tsx:12 — implementação usa text-[#00A87E], não text-emerald-400
expect(screen.getByText('OK').className).toContain('text-emerald-400')
```

Variante `destructive` do Button e variante `success` do Badge estão sem cobertura real desde a criação. O CI não executa testes — esses bugs passam despercebidos.

---

### [P0-4] CI quebrado desde commit d8247d9
**Arquivo:** `.github/workflows/ci.yml:66`

Step executa `sed` em `k8s/deployment.yaml` que foi deletado. Todo push em `main` termina com exit code 1. A imagem Docker é pushed antes do step falho, mas o job fica em erro — CI inutilizável.

---

### [P1-1] Modal com animação silenciosa em produção
**Arquivo:** `src/components/Modal/Modal.tsx:127-129`

```tsx
style={{ animation: 'iit-fadeIn 0.15s ease-out' }}
```

`tailwind.config.ts:68` registra o keyframe como `fadeIn`, não `iit-fadeIn`. Referência incorreta — modal abre sem transição em produção.

---

### [P1-2] `./tokens` export sem campo `types`
**Arquivo:** `package.json:15-18`

O subpath `./tokens` não tem `"types"`. `tsc` e editores com `moduleResolution: bundler` não encontram declarações `.d.ts` — sem type-check para consumidores que importam tokens diretamente.

---

### [P1-3] React 18 + React-DOM 19 nas devDependencies
**Arquivo:** `package.json` (devDependencies)

Versões incompatíveis no ambiente Storybook/vitest. React 18 e react-dom 19 causam warnings e podem introduzir comportamentos não determinísticos nos testes.

---

### [P1-4] `storybook-static/` commitado no git
Artifact de build (108 arquivos) no repositório. Aumenta clone desnecessariamente e polui o histórico.

---

## Planejado vs Construído vs Gap

| Funcionalidade | Status | Gap |
|----------------|--------|-----|
| Button (variants, loading, icons) | ✅ Completo | Testes com falsos negativos; variante `success` não testada |
| Badge (variants, dot) | ✅ Completo | Teste usa classe errada; 4 variantes sem cobertura |
| Input (label, error, helperText) | ✅ Completo | leftElement/rightElement sem teste; disabled sem teste |
| Textarea (showCount, maxLength) | ✅ Completo | controlled/uncontrolled sem teste |
| Select (label, error, options) | ✅ Completo | placeholder/disabled sem teste |
| Modal (open/close, overlay, focus trap) | ✅ Completo | Animação quebrada (iit-fadeIn); Escape key sem teste |
| Skeleton | ✅ Completo | Invisível em light mode (cor hardcoded) |
| EmptyState | ✅ Completo | iconColor/iconBgColor sem teste |
| Card (header, footer) | ✅ Completo | hoverable sem teste |
| Toast / Notification | ❌ Ausente | SocialMake e Nitro aguardando |
| Pagination | ❌ Ausente | my-library (Libri) bloqueado |
| DatePicker | ❌ Ausente | scheduling-service e events-service aguardando |
| Tabs | ❌ Ausente | Múltiplos produtos precisam |
| Export `./tokens` funcional | ❌ Quebrado | `dist/tokens/index.js` nunca gerado |
| Adoção pelos produtos IIT | ❌ Zero | focus-hub, SocialMake, my-library não consomem @iit/ui |

---

## DevOps — Estado CI/CD

| Item | Estado |
|------|--------|
| CI executa `npm test` | ❌ Nunca — só `build-storybook` |
| CI quebrado (step k8s deletado) | ❌ Desde commit d8247d9 |
| Publish NPM automatizado | ❌ `workflow_dispatch` manual |
| Versionamento semântico (changesets) | ❌ Ausente — v0.1.0 hardcoded |
| CHANGELOG | ❌ Ausente |
| Storybook publicado (URL pública) | ❌ Não deployado |
| `storybook-static/` no .gitignore | ❌ Commitado (108 arquivos) |
| Dependabot | ❌ Não configurado |
| Chromatic (visual regression) | ❌ Ausente |

---

## Finance — Análise Make vs Buy

| Cenário | Custo setup | Economia/ano | Payback |
|---------|------------|-------------|---------|
| Manter iit-ui | R$54k/ano manutenção | R$5.250 | 11 anos ❌ |
| Migrar para shadcn/ui | R$3.300 one-time | R$54k/ano | 3 meses ✅ |
| Descentralizar (cada produto faz o seu) | R$26k setup | Alto risco fragmentação | N/A |

**Recomendação:** migrar para shadcn/ui puro + manter `@iit/tokens` como pacote standalone de design tokens. Economia líquida 2026: **R$36.450**.

---

## Growth — Adoção Zero nos Produtos IIT

Componentes duplicados identificados:
- **focus-hub:** Button, Input, Modal, Card, EmptyState, Dropdown (1.500 LOC)
- **SocialMake:** sem uso de iit-ui
- **my-library:** aguarda Pagination

Causa raiz: Storybook sem URL pública → sem referência visual; pacote não publicado de forma rastreável → sem confiança em updates; sem ADR proibindo componentes locais que repliquem o catálogo.

---

## Top 5 Movimentos Prioritários

### Movimento 1 — [BLOCKER] Corrigir CI + testes falsos negativos (P0, 1 dia)

**CI:** remover o step `sed k8s/deployment.yaml` em `ci.yml:66` (arquivo foi deletado). Adicionar `npm test` antes do build.

**Testes:** corrigir `Button.test.tsx:33` para `text-red-600` e `Badge.test.tsx:12` para `text-[#00A87E]`. Adicionar cobertura para variantes não testadas.

**Critério de aceite:** CI verde em todo push; `npm test` executado antes do build; falsos negativos eliminados.

---

### Movimento 2 — [BLOCKER] Corrigir build — export `./tokens` + Skeleton light mode (P0, 4h)

**Build:** adicionar `preserveModules: true` no `vite.config.ts` ou segundo entry point para `tokens`. Adicionar `"types"` ao subpath `./tokens` no `package.json`.

**Skeleton:** `bg-[#E5E7EB] dark:bg-[#1E1E28]` em `Skeleton.tsx:6`.

**Modal:** corrigir `iit-fadeIn` → `fadeIn` em `Modal.tsx:127`.

**Critério de aceite:** `import { colors } from '@iit/ui/tokens'` funciona sem erro; Skeleton visível em light mode; Modal anima ao abrir.

---

### Movimento 3 — [PRODUTO] Publicar Storybook + versionamento semântico (P1, 1 dia)

Deploy do Storybook no GitHub Pages. Configurar `changesets` para versionamento semântico e CHANGELOG automático. Remover `storybook-static/` do git.

**Critério de aceite:** URL pública do Storybook funcionando; CHANGELOG gerado no próximo release; `storybook-static/` no `.gitignore`.

---

### Movimento 4 — [PRODUTO] Toast + Pagination (P1, 3 dias)

Toast desbloqueia SocialMake e Nitro. Pagination desbloqueia my-library (lista de 500+ livros). Ambos são os componentes mais solicitados pelos produtos IIT.

**Critério de aceite:** `<Toast>` e `<Pagination>` no Storybook com stories; exportados do `src/index.ts`; testes com cobertura ≥ 80%.

---

### Movimento 5 — [ESTRATÉGICO] Decisão: manter iit-ui vs migrar para shadcn/ui (P1, 1 sprint)

Com base na análise finance (payback 3 meses para migração), propor ADR ao time: manter iit-ui como wrapper de shadcn/ui + `@iit/tokens` standalone, ou decommission e cada produto usa shadcn/ui direto com tokens compartilhados.

**Critério de aceite:** ADR aprovado; migração piloto do focus-hub concluída; 0 componentes duplicados no focus-hub após migração.

---

## Padrões Sistêmicos IIT Confirmados

| Padrão | iit-ui |
|--------|--------|
| CI sem execução de testes | ✅ Confirmado |
| CI quebrado (step morto) | ✅ Confirmado |
| Versionamento manual sem semver | ✅ Confirmado |
| Artefatos de build no git | ✅ Confirmado (storybook-static/) |
| Dependências incompatíveis (react 18+19) | ✅ Confirmado |
| Adoção zero nos produtos consumidores | ✅ Confirmado |
