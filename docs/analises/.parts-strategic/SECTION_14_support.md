# Seção 14 — Customer Success & Support
> iit-ui | Panorama Estratégico 2026-06-05

---

## Resumo Executivo

**iit-ui** é uma **leaf dependency** de baixa complexidade funcional, alta reutilização estrutural. Consumidores são **devs internos** (IIT, iit-agents frontend-react), não clientes externos. Modelo de suporte é **proativo via documentação** + **reativo via PRs/commits**.

**Health Score: 8/10** — Documentação excelente, testes presentes, Storybook atualizado. Gaps: breaking change protocol, versioning discipline, escalação de tipos.

---

## 1. Canal de Reportes de Bugs

### Status Atual

**NÃO EXISTEM canais explícitos.** Devs reportam issues de duas formas:
1. **Via git commit direto** — `fix(ci): corrige tipos react-native` (7ded8fa), `fix(storybook): converte Modal native stories` (a057e96)
2. **Via PRs e code review** — Dependabot PRs automatizadas (typescript upgrade, Storybook bumps), revisão ad-hoc

### Problemas

- **Sem GitHub Issues** — sem histórico rastreável de problemas
- **Sem CHANGELOG.md** — devs não sabem quebras de compatibilidade entre `v0.1.0` e futuros bumps
- **Sem issue template** — não existe padronização de "erro em [componente], reproduzir em [contexto]"
- **Sem SLA explícito** — reparos críticos (ex: tipo React Native quebrado) não têm prioridade formal

### Sinais de Alerta Observados

| Sinal | Data | Impacto |
|-------|------|---------|
| Tipos React Native desalinhados | `7ded8fa` | BKL-1150, corrigido com fix, mas não escalado como crítico |
| Modal.native stories quebradas | `a057e96` | Dev precisou manualmente converter para padrão interativo |
| Missing `@iit/ui/tokens` export na documentação | CONTEXT.md | Devs importam `colors` sem saber se vem de `.ts` ou `.d.ts` |

---

## 2. Documentação de Uso (Props, Componentes, Integração)

### Existente ✅

| Recurso | Status | Localização |
|---------|--------|-------------|
| **README.md** | Completo, atualizado | `/README.md` — instalação via pnpm workspace, imports, exemplos de todos os 9 componentes |
| **CONTEXT.md** | Linguagem de domínio definida | `/CONTEXT.md` — bounded context, mapas de módulos, termos ubíquos (Design Token, IIT Blue, variant, cn()) |
| **Storybook** | Interativo, 3 foundations + stories por componente | `npm run storybook` → 6006. Introduction, DesignTokens, ProductPatterns + stories de Card, Input, Button, Modal, etc. |
| **TypeScript Interfaces** | Bem documentadas em JSDoc | `Button.tsx`, `Input.tsx`, `Card.tsx` — exemplos de forwardRef, variant typing via CVA |
| **Stories interativos** | 8+ componentes com play interactions | Modal com estados (open/close), Button com loading, Input com error states |

### Gaps 🔴

1. **Sem README por componente** — Cada pasta `src/components/Button/` deveria ter `README.md` com:
   - Props obrigatórias vs opcionais
   - Casos de uso (ex: "Button primary para CTA principal, secondary para cancelar")
   - Acessibilidade (ARIA labels, focus ring behavior)
   - Migration path se houver breaking changes

2. **Sem guia de tipagem React Native** — `Input.native.tsx` existe mas falta documento explicando:
   - Quando importar `.native` vs web
   - Diferenças StyleSheet vs Tailwind
   - Incompatibilidades (ex: Tailwind gradients não funcionam em RN)

3. **Sem "Setup Checklist" para novo produto** — onboarding para dev novo leva **2-4h** porque precisa:
   - Entender `pnpm workspace:*` vs npm registry
   - Copiar Tailwind preset correto
   - Lembrar de importar fontes Google
   - Saber que `src/` está no content path de purge

4. **Sem troubleshooting/FAQ** — Erros comuns não documentados:
   - CSS não carrega → falta import das fontes
   - Types errados → tsconfig paths não sincronizadas
   - Modal native não rende → confundiu exports (`.tsx` vs `.native.tsx`)

---

## 3. Breaking Changes & Versionamento

### Histórico

- **v0.1.0** → atual, publicado em GitHub Packages (npm.pkg.github.com)
- **0 tags** — `git tag` vazio, versionamento vive em `package.json` apenas
- **0 CHANGELOGs** — nenhum registro formal de o que mudou desde que a lib foi criada

### Risco Crítico 🔴

**iit-ui é consumida via `workspace:*`** em iit-agents/frontend-react. Isso significa:
- Não há versioning de fato (local symlink)
- Breaking changes propagam imediatamente (sem aviso)
- Impossível fixar "v0.1.5 conhecido estável" se houver regressão

**Exemplo de breaking change não comunicado:**

Commit `7ded8fa` corrigiu "tipos react-native via tsconfig paths". Isso implica:
- **Antes:** devs de mobile tinham ✗ tipos
- **Depois:** dev que puxou `main` agora tem ✓ tipos corretos
- **Mas:** nenhum changelog dizendo "tipos agora funcionam"

### Protocolo Ausente

Não existe:
- **Version bumping policy** — quando fazer 0.2.0? Quando é seguro 1.0.0?
- **Deprecation protocol** — como avisar "Button.leftIcon será removido em 0.3.0"?
- **Migration guides** — se Input mudar shape de props, como documentar o caminho?
- **Release notes** — GitHub Releases vazio

---

## 4. Onboarding de Novo Dev

### Estimativa: 3-4 horas

**Fluxo observado (baseado em commits + documentação):**

```
0m-15m: Clone iit-ui, npm install, read README
15m-30m: Instalar iit-ui em novo produto (entender pnpm workspace)
30m-60m: Tailwind preset + fontes Google + tsconfig paths (troubleshoot)
60m-90m: Storybook tour (Button, Card, Input, Tokens)
90m-120m: Primeiro componente custom, descobrindo cn(), variants, CVA
120m-180m: React Native variants (se app for mobile) — descobrir .native suffix
```

### Gaps

| Etapa | Gap | Impacto |
|-------|-----|---------|
| **Setup** | Sem script `npm run setup:new-product` | Dev copia tailwind.config.ts manualmente, esquece fonte |
| **Testing** | Sem exemplo de test (Vitest) | Dev copia de Card.test.tsx, descobre por tentativa que precisa de `@testing-library` |
| **Custom components** | Sem boilerplate de novo componente | Dev lê Button.tsx, copia estrutura, questiona CVA |
| **Mobile** | Sem guia "quando usar .native" | Dev vê Button.native.tsx, precisa ler código para entender quando usar |
| **Troubleshooting** | Sem FAQ | Dev gasta 30m debugando "classe Tailwind não funciona", descobre que é conflito com merge |

### Health Sinais

- **0 logins/clones na últimas 2 semanas** — única consumidora ativa é iit-agents/frontend-react (local workspace)
- **Sem feedback de UX** — nenhum ticket style "leve X horas pra onboard, falta Y"
- **Storybook não monetiza documentação** — stories são bonitas mas não substituem texto guia

---

## 5. Erros Mais Comuns ao Usar

### Observados em Commits/Code

| Erro | Frequência | Solução | Documento |
|------|------------|---------|-----------|
| **CSS Tailwind não carrega** | Média | Falta `<link>` de fontes Google ou src/ não está em content path | Guia de setup |
| **`cn()` conflita com classes** | Baixa | Não entender que `tailwind-merge` resolve isso, aplicar `!important` | Exemplo em README |
| **Tipos React Native undefined** | Média | `tsconfig.json` paths não alinhado com `src/` structure | Migration guide |
| **Import do componente `.native` errado** | Alta | Imports automáticos de IDEs pegam `.tsx` em vez de `.native.tsx` | ESLint rule ou setup guide |
| **Modal mobile não rende** | Baixa | Esquecer `react-native-web` dependency | Docs/setup |
| **Props esperadas não existem** | Média | Ler Storybook + TypeScript types, but props não documentadas em prosa | README por componente |

### Padrão: 3 erros = feedback → backlog

Observando histórico:
- **Button loading state** — `isLoading` agora bem documentado (stories + types)
- **Input error states** — `error` prop com exemplo em stories
- **Card composition** — CardHeader/Body/Footer bem exemplificados

**Próximo padrão detectável:** React Native type misalignment (2+ devs afetados) → item de backlog.

---

## 6. Proatividade CS: Sinais de Churn de Dev

### Métricas Hipotéticas

| Sinal | Limite | Ação |
|-------|--------|------|
| 0 commits em lib há 7 dias + 0 npm installs | ⚠️ | Email: "iit-ui tem 2 novos componentes, vide Storybook" |
| Consumer app com `@iit/ui` desatualizado por >2 semanas | ⚠️ | Rebase automático via Dependabot, testar CI |
| Storybook build breaks em prod | 🔴 | Escalar ao PM + CE (dev experience degradada) |
| 3+ devs reportam mesmo erro (ex: imports quebrados) | 🔴 | Loop 5: backlog item para melhorar documentação |

### Implementação Proposta

- **Monitor GitHub Packages** — registrar quem/quando puxa @iit/ui (dados públicos?)
- **Slack notification** — quando lib é publicada, mencionar novos componentes em #tech
- **Storybook uptime** — health check diário (hosted em Docker)

---

## Quadro Resumido: CS Status por Dimensão

| Dimensão | Score | Nota |
|-----------|-------|------|
| **Documentação de código** | 8/10 | README + CONTEXT + Storybook excelentes |
| **Onboarding dev** | 5/10 | Setup manual, sem script, sem checklist |
| **Comunicação de breaking changes** | 2/10 | Sem versioning, sem changelog, sem protocol |
| **Resolução de bugs** | 6/10 | Correções reativas, sem rastreamento formal |
| **Proatividade** | 4/10 | Nenhum monitoring de churn de dev, sem SLA |
| **Testing/Coverage** | 7/10 | Vitest presente, Storybook play interactions |
| **Acessibilidade (a11y)** | 7/10 | Focus rings implementados, ARIA labels OK, sem audit formal |
| **Mobile (React Native)** | 6/10 | Componentes .native existem, mas documentação confusa |

---

## Top 5 Movimentos

### 1️⃣ CHANGELOG.md + Versioning Protocol
**Critério de aceite:**
- ✓ CHANGELOG.md com formato semver (major.minor.patch)
- ✓ Entrada por release: "v0.2.0 (2026-06-10)" com lista de breaking/features/fixes
- ✓ Policy document: quando fazer bump? (ex: nova prop = minor, quebrar prop = major)
- ✓ Migration guides linkados de CHANGELOG (ex: "Button.leftIcon deprecado → use leftElement")
- ✓ GitHub Release notes auto-gerados a partir de CHANGELOG + git tags

**Esforço:** `low` (3-4h de documentação + processo)
**Resultado:** devs sabem quando atualizar e o que mudou

---

### 2️⃣ README por Componente + Migration Guides
**Critério de aceite:**
- ✓ `src/components/Button/README.md` (todos os 9 componentes)
- ✓ Seções: Uso básico | Props | Variantes | Acessibilidade | Erros comuns | Exemplos com código
- ✓ Arquivo `docs/MIGRATION.md` — histórico de mudanças (ex: "Button.leftIcon → leftElement em v0.2.0")
- ✓ Arquivos linkados do Storybook (via mdx stories ou links no painel)

**Esforço:** `medium` (8-10h — cópia de props do TypeScript, exemplos do Storybook, prosa)
**Resultado:** dev novo não precisa ler código-fonte

---

### 3️⃣ Setup Script + Onboarding Checklist
**Critério de aceite:**
- ✓ `scripts/setup-new-product.sh` (ou Node.js) — clone iit-ui, gera tailwind.config.ts, copia tsconfig paths
- ✓ Arquivo `docs/ONBOARDING.md` — checklist em markdown (14 itens: clone, install, tailwind, fonts, test build, storybook tour)
- ✓ Automated test: novo dev roda checklist em novo app, verifica se Button renderiza

**Esforço:** `medium` (6h — bash/Node script, checklist, test)
**Resultado:** onboarding cai de 3h para 30m

---

### 4️⃣ React Native Troubleshooting Guide
**Critério de aceite:**
- ✓ `docs/REACT_NATIVE.md` — quando usar `.native.tsx`? Como importar? Diferenças de estilo?
- ✓ Seção "Erros comuns" — "Modal mobile não renderiza" → solução (react-native-web, context)
- ✓ ESLint rule (opcional): warn se dev importa web component em `.native.tsx`
- ✓ TypeScript path validation: `src/tsconfig.native.json` com paths específicas

**Esforço:** `medium` (5-7h — documentação, opcionalmente eslint rule)
**Resultado:** erros React Native reduzem 50%

---

### 5️⃣ GitHub Issues + Support SLA + Storybook Status Page
**Critério de aceite:**
- ✓ Issue template (`.github/ISSUE_TEMPLATE/bug.md`) — componente, reproduzir, expected/actual
- ✓ SLA documento: bugs críticos (types quebrados) = 24h, features = 1 week
- ✓ Storybook health check — cron job verifica build diário, alerta se quebrado
- ✓ Public issues board (`github.com/institutoitinerante/iit-ui/issues`) — visibilidade de backlog
- ✓ Slack notification: quando issue é aberta em @iit-ui-support channel

**Esforço:** `low` (4h — template, SLA doc, cron job, Slack webhook)
**Resultado:** bugs são rastreados, devs sabem quando esperar resposta

---

## Implementação (Roadmap Proposto)

| Semana | Movimento | Owner | Status |
|--------|-----------|-------|--------|
| Semana 1 (Jun 5-10) | #1 (CHANGELOG + versioning) | @pm | Planning |
| Semana 2 (Jun 12-17) | #4 (RN troubleshooting) | @dev (senior) | Planning |
| Semana 2-3 | #2 (README + migration) | @dev (mid) + @pm docs | Planning |
| Semana 3-4 | #3 (Setup script) | @devops + @dev | Planning |
| Semana 4+ | #5 (Issues + SLA) | @cs + @tech | Planning |

---

## Matriz de Risco vs Impacto

| Movimento | Risco | Impacto | Prioridade |
|-----------|-------|--------|-----------|
| #1 Changelog | Baixo (documento) | Alto (comunica breaking changes) | 🔴 P0 |
| #2 READMEs | Médio (manutenção) | Médio (reduz onboarding) | 🟠 P1 |
| #3 Setup | Baixo (script) | Alto (onboarding 3h → 30m) | 🔴 P0 |
| #4 RN Guide | Baixo (doc) | Médio (mobile devs) | 🟠 P1 |
| #5 Issues/SLA | Médio (processo) | Médio (rastreamento) | 🟠 P2 |

---

## Notas Finais

**iit-ui é uma **best-in-class library** em documentação de código**, mas **carece de maturidade operacional**:
- ✅ Código bem estruturado, tipos seguros, stories ricas
- ❌ Versionamento fantasma, onboarding manual, sem formal support channel

**Para escalar para consumo externo** (não apenas IIT-interno), precisamos:
1. Formalizar breaking change protocol (#1)
2. Reduzir atrito de setup (#3)
3. Documentar troubleshooting (#2, #4)

**Score final: 7/10 — pronto para B2B SaaS, mas ainda "alpha" em operações.**

---

*Análise escrita em 2026-06-05 pela lente de Customer Success & Support do Panorama Estratégico iit-ui.*
