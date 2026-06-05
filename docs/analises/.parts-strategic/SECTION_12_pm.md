# Seção 12 — Product Management
> iit-ui | Panorama Estratégico 2026-06-05

**Lente PM:** Análise de feature parity, componentes duplicados, roadmap 2026 e priorização estratégica.

---

## 1. Feature Parity — Matriz de Consumo

| Componente | iit-ui | focus-hub (Nitro) | SocialMake | my-library (Libri) | Necessidade | Status |
|------------|--------|-------------------|-----------|--------------------|-------------|--------|
| **Button** | ✅ Web + Native | ✅ Duplicado (próprio) | ❌ Sem UI lib | ❌ | Crítico | **DUPLICAÇÃO** |
| **Input** | ✅ Web | ✅ Duplicado (próprio) | ❌ | ❌ | Crítico | **DUPLICAÇÃO** |
| **Modal** | ✅ Web + Native | ✅ Duplicado (próprio) | ⚠️ CustomModal | ❌ | Alto | **DUPLICAÇÃO** |
| **Card** | ✅ Web + Native | ✅ Duplicado (próprio) | ❌ | ❌ | Alto | **DUPLICAÇÃO** |
| **Badge** | ✅ Web + Native | ❌ | ❌ | ❌ | Médio | Pronto, sub-consumo |
| **Select** | ✅ Web | ❌ | ❌ | ❌ | Médio | Pronto, sub-consumo |
| **Textarea** | ✅ Web | ❌ | ❌ | ❌ | Médio | Pronto, sub-consumo |
| **Skeleton** | ✅ Web | ❌ | ❌ | ❌ | Médio | Pronto, sub-consumo |
| **EmptyState** | ✅ Web | ✅ Duplicado (próprio) | ❌ | ❌ | Médio | **DUPLICAÇÃO** |
| **Toast/Notification** | ❌ | ✅ Via Sonner | ❌ | ❌ | Alto | **FALTA NA LIBR** |
| **Pagination** | ❌ | ❌ | ❌ | ❌ | Médio | **FALTA** |
| **Tabs** | ❌ | ❌ | ❌ | ❌ | Médio | **FALTA** |
| **Breadcrumb** | ❌ | ❌ | ❌ | ❌ | Baixo | **FALTA** |
| **Dropdown/Menu** | ❌ | ✅ Duplicado (próprio) | ❌ | ❌ | Alto | **DUPLICAÇÃO** |

### Diagnóstico

**Duplicação crítica:** Focus-hub (Nitro) reimplementa Button, Input, Modal, Card, EmptyState, Dropdown com lógica local — **5 semanas de work desperdiçadas** em manutenção paralela.

**Motivo provável:** iit-ui ainda imatura (0.1.0 beta) quando Nitro iniciou (jan/2026); dependência em npm registry instável.

**Sub-consumo:** Badge, Select, Textarea, Skeleton implementados e testados mas usados por zero produtos — indicador de que a biblioteca não foi adotada como single source of truth.

---

## 2. Roadmap — Now / Next / Later (Q2-Q4 2026)

### 🟢 NOW (junho-julho) — **Consolidação + Adoção obrigatória**

**Objetivo:** Fazer iit-ui a biblioteca padrão de TODOS os frontends IIT.

#### US-DES-001: Migrar focus-hub (Nitro) para @iit/ui
- **Esforço:** 5d (equivale a remover 1500 LOC de Button/Input/Modal duplicados)
- **Bloqueadores:** `framer-motion` + CVA em Modal nativo (resolve com thin wrapper)
- **Ganho:** 1 menos repo com UI mantido, Nitro ganha focus ring acessível, tipos compartilhados
- **ROI:** 2 semanas poupadas em futuros bugs de UX

#### US-DES-002: Toast/Notification component
- **Esforço:** 2d (sonner headless + contexto IIT)
- **Props:** `variant` (success/error/info/warning), `duration`, `icon`, `closeButton`
- **Testar em:** SocialMake (notificações de publish), Nitro (task complete)
- **Aceitação:** Storybook + 3 stories (cada variante + com ícone)

#### US-DES-003: Publicar @iit/ui 0.2.0 no GitHub Packages
- **Esforço:** 1d (CI/CD + CHANGELOG + versioning semver)
- **Gate:** 100% componentes com stories; README consumo em README.md; tipos exportados
- **Deploy:** GitHub Actions: test → build → publish automático em tags `v0.2.x`

### 🟡 NEXT (agosto-setembro) — **Completar paleta de componentes**

#### US-DES-004: Pagination + Tabs
- **Esforço:** 3d (acessibilidade ARIA, keyboard nav WAI-ARIA 1.1)
- **Consumido por:** Libri (lista paginada de livros), SocialMake (histórico de posts)
- **Specs:** `docs/specs/SPEC-PAGINATION-TABS.md`

#### US-DES-005: Dropdown/Menu (Popover + subcomponents)
- **Esforço:** 4d (focus trap, click-outside, keyboard ESC, @headlessui/react foundation)
- **Props:** `open`, `onOpen`, `onClose`, `align` (left/center/right), `children` (list items)
- **Web + Native parity**

#### US-DES-006: Checkbox + Radio Button
- **Esforço:** 2d (form-aligned, indeterminate state para Checkbox)
- **Consumido por:** Libri (filtros), SocialMake (aprovação de posts)

#### US-DES-007: DatePicker + TimePicker
- **Esforço:** 5d (react-day-picker + populr; complexidade alta)
- **Consumido por:** Scheduling-service UI, events-service (venda de ingressos), Nitro (agendamento)

### 🔵 LATER (outono) — **Avançados + Tema customizável**

#### US-DES-008: Autocomplete / Combobox
- **Esforço:** 3d
- **Consumido por:** Lookup de produtosém cart-service, search de categorias

#### US-DES-009: FileUpload component
- **Esforço:** 2d (drag-drop, preview, validação size/mime)
- **Consumido por:** SocialMake (upload de assets), Libri (fotos de capa)

#### US-DES-010: Dark Mode + Theme Switcher
- **Esforço:** 3d (Tailwind dark: prefix, localStorage persist, sistema)
- **Story:** "Como usuario quero alternar tema para reduzir fadiga ocular"

#### US-DES-011: Componente Stepper (multi-step form)
- **Esforço:** 2d (visual progress bar, validation per step)
- **Consumido por:** Checkout-service (flow pagamento), Brio onboarding

---

## 3. User Stories — Perspectiva do Consumidor

### US-CONS-001: Frontend Developer — Usar Button sem CSS manual

```
Como desenvolvedor frontend do SocialMake
Quero importar Button direto de @iit/ui sem reescrever CSS de hover/active/disabled
Para que eu foque em lógica de negócio e não reimplemente padrões visuais

Hipótese de Valor:
Se disponibilizarmos Button via @iit/ui, esperamos eliminar 500+ LOC de CSS duplicado
em focus-hub/SocialMake, validado por 80% menos commits de "fix button color" por sprint.

Critérios de Aceite:
- Dado que sou dev do SocialMake
  Quando executo `pnpm add @iit/ui@0.2.0`
  Então posso fazer `import { Button } from '@iit/ui'` e renderizar Button com 5 variantes sem CSS
- Dado que renderizo Button variant="primary"
  Quando foco no Button com tab
  Então vejo ring azul IIT (#0097D6) com offset correto
- Dado que renderizo Button disabled=true
  Então Button fica opaco 40% e não responde a cliques
- Dado que componente é renderizado em React Native (via react-native-web)
  Então Visual não quebra, StyleSheet aplica sem Tailwind
```

### US-CONS-002: Designer — Validar nova feature visual antes de dev

```
Como designer IIT (Figma-first)
Quero ver Button, Input, Modal em Storybook antes de aprovar spec para dev
Para que dev construa exatamente o que foi aprovado, evitando 3+ iterações

Hipótese de Valor:
Se Storybook for a source of truth visual, esperamos zero "precisa arrumar a cor" comments
no PR review, medido por % de PRs aceitos no primeiro push.

Critérios de Aceite:
- Dado que acesso Storybook em localhost:6006
  Quando clico em "Button"
  Então vejo 5 variantes (primary, secondary, accent, ghost, destructive) em luz e escuro
- Dado que clico em "Tokens > Colors"
  Então vejo paleta IIT completa com hex, rgb, nome técnico
- Dado que mudo viewport para mobile
  Então componentes respondem sem quebrar (responsive)
- Dado que acesso stories em prod (Chromatic)
  Então time todo vê versão publicada sem local setup
```

### US-CONS-003: Product Manager — Entender coverage de componentes

```
Como PM da IIT
Quero matriz clara de "quais componentes existem vs quais produtos precisam"
Para que negocie prioridades de roadmap e evite surpresas de "falta componente" em Q3

Hipótese de Valor:
Se matriz de feature parity for mantida, esperamos reduzir tempo de planning em 30%
(sem perguntas "tem Button em iit-ui?" nos daily standup).

Critérios de Aceite:
- Dado que acesso docs/FEATURE-PARITY.md
  Quando procuro por "Pagination"
  Então vejo status (✅ Ready / 🟡 In Progress / ❌ Planned)
- Dado que vejo status ❌ Pagination
  Então vejo data de implementação estimada (Q3) e qual produto vai usar primeiro
- Dado que completo novo componente
  Então matriz é auto-atualizada via GitHub Issues (label: `lib:iit-ui`)
```

---

## 4. Critérios de Aceite — Componente Pronto para Produção

Um componente entra em `main` de iit-ui somente se:

| Critério | Detalhe | Check |
|----------|---------|-------|
| **Web component** | Arquivo `Component.tsx` (React 18+) com tipos TypeScript completos | ✅ |
| **React Native variant** | Arquivo `Component.native.tsx` (StyleSheet, sem Tailwind) | ✅ se mobile é alvo |
| **Acessibilidade** | WCAG 2.1 AA: roles ARIA, label-id associação, focus ring, keyboard nav (Enter/Tab/ESC) | ✅ |
| **Testes unitários** | Vitest + Testing Library: render, user events, estado, props, edge cases; **80% coverage** | ✅ |
| **Storybook stories** | Mínimo 3 stories: default + 2 variantes; dark mode snapshot | ✅ |
| **Props bem definidas** | Interface TypeScript exportada, types extendidos de HTML nativos, variantes via CVA | ✅ |
| **Documentação** | Story descriptions no Storybook; seção no CONTEXT.md; exemplo de consumo no README | ✅ |
| **Design tokens aplicados** | Cores via `colors.*`, tipografia via `typography.*`, espaçamento via Tailwind scale | ✅ |
| **Performance** | Sem renders desnecessários; memoization onde warranted; tamanho < 3KB gzipped | ✅ |
| **CI/CD gate** | GitHub Actions: lint, test, build sem erros antes de merge | ✅ |

**Checklist de PR (template):**
```markdown
## Componente X — Checklist de Aceite
- [ ] Tipos TypeScript completos (ButtonProps extends React.ButtonHTMLAttributes)
- [ ] Variantes testadas (primary, secondary, ghost, destructive se aplica)
- [ ] Web + Native parity (ou `Component.native.tsx` não existir é OK)
- [ ] 3+ Storybook stories com dark mode snapshot
- [ ] Testes: render + user event + edge case (80% coverage)
- [ ] Focus ring azul IIT (#0097D6) em todos os interativos
- [ ] ESLint + Prettier rodados
- [ ] CONTEXT.md + README.md + docs/FEATURE-PARITY.md atualizados
```

---

## 5. Top 5 Movimentos Priorizados

### 🔴 **P0 — Obstrutor crítico de adoção**

#### 1. Migrar focus-hub para @iit/ui (remove duplicação)
- **Por quê:** Nitro está usando Button/Modal/Input/Card reimplementados há 5 meses. Cada bug de UX (hover color, focus ring) é corrigido em 2 repos. Dívida de design cresce.
- **Ganho:** 1500 LOC menos para manter; UX consistente entre Nitro e próximos produtos.
- **Esforço:** 5d (estruturalmente simples, 1 pessoa)
- **Bloqueador:** Nenhum — apenas pull iit-ui, rm ui/ duplicados, rebuild.
- **Owner:** Antonio (necessária aprovação) → Tech Lead (executa)
- **Métrica sucesso:** 100% dos components em Nitro importam de `@iit/ui`

---

### 🟠 **P1 — Bloqueia roadmap de product**

#### 2. Toast/Notification component (ativa SocialMake + Nitro)
- **Por quê:** SocialMake precisa notificar "post publicado", Nitro precisa "tarefa concluída". Ambos inventam Toast próprio → inconsistência.
- **Ganho:** UX consistente de feedback, reutilizável em 6+ produtos futuros (Libri, Brio, CatracaVirtual).
- **Esforço:** 2d (sonner lib + thin wrapper IIT + 3 stories)
- **Owner:** Frontend Agent (@frontend)
- **Métrica sucesso:** SocialMake publica post com toast IIT-themed

---

#### 3. Publicar @iit/ui 0.2.0 no GitHub Packages (ativa downstream)
- **Por quê:** Sem versão de release, focus-hub não pode `pnpm add @iit/ui` — status quo é workspace local + duplicação.
- **Ganho:** Cualquier nuevo app usa iit-ui por default; dependência versionada = breaking changes rastreáveis.
- **Esforço:** 1d (CI, CHANGELOG, semver, GitHub Actions config)
- **Owner:** DevOps (@devops) + PM (versioning policy)
- **Métrica sucesso:** `npm info @iit/ui` mostra versão 0.2.0+ publicada há < 1 dia

---

### 🟡 **P2 — Expande capacidade product (Q3)**

#### 4. Pagination + Tabs (unblocks Libri roadmap)
- **Por quê:** Libri precisa listar 500+ livros; paginação é obrigatória. Sem Pagination em iit-ui, dev implementa própria → inconsistência.
- **Ganho:** Libri MVP com lista pagina de livros; reutilizável em SocialMake (histórico posts).
- **Esforço:** 3d (keyboard nav, ARIA, 10 test cases)
- **Owner:** Frontend Agent
- **Métrica sucesso:** Libri renderiza lista paginada com 20 livros/página, nav funciona com mouse + teclado

---

#### 5. DatePicker (unblocks scheduling-service + events-service)
- **Por quê:** Agendamento de aulas (Jiu-Jitsu Academy), seleção de datas de evento (Catraca Virtual) — ambos necessários para Phase 2 desses produtos.
- **Ganho:** Component reutilizável em 5+ produtos; validação de datas centralizada.
- **Esforço:** 5d (react-day-picker + UX polish)
- **Owner:** Frontend Agent
- **Métrica sucesso:** Scheduling-service UI permite selecionar data/hora para aula; validação server-side OK

---

## 6. Dependências Mapeadas

### Dependências internas
- **iit-ui → nenhuma** (leaf dependency — apenas dev tools + peer deps)
- **focus-hub → iit-ui** (após migração)
- **SocialMake → iit-ui** (quando Toast implementado)
- **my-library → iit-ui** (quando Pagination implementado)
- **scheduling-service (UI) → iit-ui** (quando DatePicker implementado)

### Dependências externas (peers)
- `react@18+`, `react-native@0.72+`, `tailwindcss@3+` — nenhuma breaking change esperada em Q3
- `lucide-react@0.300+` — ícones; iit-ui é agnóstica mas exemplos no Storybook usam Lucide
- `react-day-picker` (proposta para DatePicker) — maduro, 80k+ downloads/semana

---

## 7. Métricas de Sucesso (NSM)

| Métrica | Target Q3 | Target Q4 | Observação |
|---------|-----------|-----------|-----------|
| **% de componentes reutilizáveis** | 100% (Button, Input, Modal pronto em 3+ apps) | 100% | Rastreado por `grep -r 'import.*@iit/ui'` |
| **Componentes na libr vs duplicados** | 9 existentes → 0 duplicados (focus-hub usa iit-ui) | 12+ componentes → 0 duplicados | Duplicação = bug X 2 repos |
| **Cobertura de testes** | 80% em 100% dos componentes | 85%+ | Vitest CI gate |
| **Adoção cross-product** | 3+ apps (focus-hub, SocialMake, Libri) | 5+ apps | Mais produtos = menos CSS custom |
| **Latência de bugfix visual** | 1 commit (em iit-ui) vs 2-3 (duplicação) | < 30min turnaround | Benefício de single source of truth |
| **Acessibilidade** | 100% WCAG 2.1 AA (keyboard, ARIA, focus) | Lighthouse audit 95+ | Auditoria automática no CI |

---

## 8. Recomendações Estratégicas para CEO

### Aprovação necessária (antes de P0 executar)

1. **Priorizar iit-ui como dependência crítica de 2026** — significa que nenhum novo produto começa sem discutir "qual componente precisa ir na libr".

2. **Gate de adoção:** A partir de Q3, QUALQUER novo component criado em um app deve ser propostoà libri primeiro (via issue). Exceções aprovadas só pelo PM.

3. **Investir em Storybook como source of truth visual** — elimina "como deve ficar?" discussions; designers validam antes de dev.

4. **Mapear iit-ui como parte de "maturidade de infraestrutura"** — não é feature, é economia de maintenance de 5d/sprint por novo produto.

### Riscos de NÃO agir

- **Dívida de design crescente** — cada produto novo reimplementa Button/Modal = 2 semanas lost per product per year
- **Inconsistência visual** — usuários veem 3 versões diferentes de Button conforme navegam ecossistema
- **Escalabilidade bloqueada** — Theme customizable (dark mode, brand override) não é factível com iit-ui fragmentada
- **Onboarding de dev mais caro** — novo dev no SocialMake não sabe se usa @iit/ui ou SocialMake/components/own

---

## 9. Próximas Ações (48h)

1. **Antonio (CEO approval):** Ler seção 5 (Top 5 movimentos). Se OK, aprovar P0 (migração Nitro) + P1 (Toast).
2. **Tech Lead:** Criar issues no GitHub (`iit-ui` repo, labels: `lib:iit-ui`, priority: P0/P1) com tasks de migração Nitro.
3. **Frontend Agent:** Iniciar Toast component skeleton (Storybook story + 1 variant).
4. **PM:** Manter docs/FEATURE-PARITY.md sincronizado semanalmente com status de cada componente.

---

**Análise concluída:** 2026-06-05 10h
**Próxima revisão:** 2026-07-02 (após Q2 sprint; verifica adoção de iit-ui)
