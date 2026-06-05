# PANORAMA ESTRATÉGICO — iit-ui
> Data: 2026-06-05 | Sweep SDD v1 | Score: **66/110**

## TL;DR Executivo

`@iit/ui` é a biblioteca de design system compartilhada do ecossistema IIT — 9 componentes React (web + React Native), tokens tipados, Storybook, publicação no GitHub Packages. Maturidade alpha funcional com arquitetura limpa e TypeScript strict. Três bugs P0: falsos negativos nos testes de Button e Badge (classes assertadas não existem no código real — testes passam verde mas não detectam regressão); `iit-fadeIn` referenciada no Modal mas não definida (CSS silenciosamente quebrado); CI referencia `k8s/deployment.yaml` deletado (step falha silenciosamente em cada push). Violação das Rules of Hooks em Input/Textarea/Select (`useId` chamado condicionalmente).

---

## Score por Lente

| Lente | Score | Status |
|-------|-------|--------|
| 01 Produto | 7/10 | 9 componentes estáveis, tokens tipados, Storybook |
| 02 Design | 7/10 | Tokens sólidos; Card com cores dark hardcoded fora do sistema |
| 03 Frontend | 6/10 | TypeScript strict; Rules of Hooks violada em 3 componentes |
| 04 Backend | N/A | N/A — biblioteca frontend |
| 05 DevOps | 5/10 | CI quebrado (k8s deletado), sem testes no pipeline, actions sem SHA pin |
| 06 QA | 4/10 | Testes existem mas têm falsos negativos P0; sem coverage gate |
| 07 IA | 3/10 | Zero IA; sugestão de tokens por nicho é oportunidade |
| 08 Growth | 6/10 | Design system acelera desenvolvimento dos produtos |
| 09 Dados | 4/10 | Sem analytics de adoção de componentes |
| 10 Finanças | 8/10 | Custo praticamente zero |
| 11 Legal | 7/10 | WCAG 2.1 AA declarado; sem PII |
| **TOTAL** | **57/110** | 52% — biblioteca alpha com bugs P0 nos testes e CI quebrado |

---

## Issues criadas

### P0 — Bloqueantes
- #21 — Falsos negativos nos testes: classes CSS inexistentes asseguradas (Button, Badge)
- #22 — CI quebrado: ci.yml referencia k8s/deployment.yaml deletado
- #23 — Modal.tsx: animação iit-fadeIn referenciada mas não definida

### P1 — Críticos
- #24 — CI não executa testes nem lint antes de build/push
- #25 — Card.tsx: cores dark-mode hardcoded fora do token system
- #26 — Ausência de gate de cobertura de testes (coverage threshold)

### P2 — Qualidade (a criar)
- Rules of Hooks: useId chamado condicionalmente em Input/Textarea/Select
- exports aponta para `.ts` em vez de compilado — quebra consumidores sem transpiler
- Dependências CVA/clsx/tailwind-merge bundleadas em vez de externalizadas
- Actions sem SHA pin — supply chain risk

---

## Top 5 Movimentos Consolidados

### 1. Corrigir falsos negativos nos testes (P0 — 2h frontend)
- Button.test.tsx: corrigir `text-red-400` → `text-red-600`
- Badge.test.tsx: corrigir `text-emerald-400` → `text-[#00A87E]`
- Modal.tsx: renomear `iit-fadeIn` para `fadeIn` ou definir a keyframe

### 2. Corrigir CI (P0 — 1h DevOps)
Remover step de sed que referencia `k8s/deployment.yaml` deletado. Adicionar `npm test` antes do build do Storybook.

### 3. Corrigir Rules of Hooks em Input/Textarea/Select (P1 — 2h frontend)
Mover `useId()` para fora do condicional — chamar sempre, usar `id ?? generatedId`.

### 4. Corrigir Card dark-mode tokens (P1 — 1h design + 1h frontend)
Substituir `border-[#2A2A38] bg-[#111118]` pelos tokens `surface.dark.*` do sistema.

### 5. Configurar coverage threshold no Vitest (P1 — 30min)
Adicionar `coverage.thresholds: { lines: 80 }` no `vitest.config.ts`.

---

## Próximo Milestone: 78/110

Para sair de 57 para 78/110 (+21 pontos):
- Corrigir falsos negativos + CI: +6 (QA 4→7, DevOps 5→7)
- Rules of Hooks + Card tokens: +4 (Frontend 6→8, Design 7→8)
- Coverage threshold + testes no CI: +3 (QA 7→8)
- Externalizar dependências: +4 (Produto 7→9)
- Storybook docs completo: +4 (Produto 7→9)

Timeline estimado: 1 semana com 1 dev frontend.
