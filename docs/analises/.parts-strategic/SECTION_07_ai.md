# Seção 07 — IA
> iit-ui | Panorama Estratégico 2026-06-05

---

## Contexto da análise

O iit-ui é uma biblioteca de componentes leaf — sem lógica de negócio, sem chamadas de API, sem estado de aplicação. Isso define com precisão o espaço onde IA faz sentido: não no runtime do componente, mas no processo de autoria, manutenção e evolução do design system. O componente servido ao usuário final nunca chama um LLM. O desenvolvedor que cria ou estende o design system pode se beneficiar diretamente.

O repositório tem hoje 9 componentes (Button, Card, Input, Modal, Badge, Skeleton, EmptyState, Select, Textarea), um sistema de tokens de cor e tipografia bem definido (IIT Blue `#0097D6`, Teal `#00D6A0`, famílias surface/surfaceDark), variantes dual-target web + React Native, e Storybook 8 como interface de documentação viva. A maturidade do sistema é suficiente para introduzir automação de IA sem risco de retrabalho prematuro.

---

## 1. Geração automática de variantes de componentes via LLM

**Problema real:** Adicionar uma variante nova a um componente — por exemplo, `Button` variant `warning` — exige replicar o mesmo padrão CVA em quatro lugares: `Button.tsx`, `Button.native.tsx`, `Button.stories.tsx`, `Button.test.tsx`. O custo de consistência cai inteiramente sobre o desenvolvedor.

**Proposta:** Haiku recebe o arquivo `Button.tsx` atual como contexto e o schema CVA existente, e gera o diff das quatro alterações necessárias para a nova variante. O prompt é estruturado com cache estático (sistema CVA + tokens de cor) e input dinâmico (nome da variante solicitada + tokens de cor da variante). Output em JSON com campos `web_diff`, `native_diff`, `story_diff`, `test_diff` — o dev aplica via script ou revisa manualmente.

**Modelo:** Haiku 4.5 — é uma tarefa de extração de padrão + preenchimento de template, não requer raciocínio complexo.

**Custo estimado:** Contexto típico de um componente completo (4 arquivos) = ~2.500 tokens de input. Output da variante gerada = ~800 tokens. Com cache hit nas partes estáticas (instruções + tokens de cor), o custo efetivo cai para ~600 tokens de input cobráveis + 800 de output.

- Por request: 600 × $0,001 + 800 × $0,005 = **$0,0046 por variante gerada**
- Volume estimado: 2-4 variantes/mês = **< $0,02/mês**

**Fallback:** Se a API estiver fora, o desenvolvedor segue o processo manual atual. Zero dependência crítica.

---

## 2. Token design automatizado — geração de paleta derivada de cor-semente

**Problema real:** Quando um produto novo entra no ecossistema IIT, ou quando um produto como SocialMake precisa de um tema diferente do IIT Blue, o designer precisa derivar manualmente todos os estados (hover, active, dark mode) a partir de uma cor primária. Isso é repetitivo e propenso a inconsistência.

**Proposta:** O dev ou designer fornece uma cor hexadecimal como entrada. Haiku, com o arquivo `colors.ts` como contexto e exemplos de derivação da paleta IIT (IIT Blue → primaryLight `#33ADE0` → primaryDark `#006FA3`), gera o objeto TypeScript completo da nova paleta seguindo o mesmo schema. Inclui todas as superfícies, texto, bordas e estados de status derivados harmonicamente.

**Modelo:** Haiku 4.5 — transformação estruturada de dado + padrão conhecido.

**Custo estimado:**
- Input: ~1.200 tokens (colors.ts + instruções cacheadas) + 10 tokens da cor nova = ~250 tokens cobráveis com cache
- Output: ~600 tokens (objeto TypeScript completo)
- Por request: 250 × $0,001 + 600 × $0,005 = **$0,0033 por paleta gerada**
- Volume estimado: 1 paleta/mês por produto novo = **< $0,01/mês**

**Valor real:** Elimina o processo de trial-and-error de derivação de cor e garante que variantes dark mode seguem o mesmo critério de contraste do design system IIT.

**Fallback:** Design manual com referência ao `colors.ts` existente como template.

---

## 3. Documentação automática de props com exemplos de uso

**Problema real:** O Storybook do iit-ui tem stories bem estruturados para o Storybook Canvas, mas a documentação de props dos componentes depende inteiramente de JSDoc manual nos arquivos TypeScript. Componentes como `Input` (que tem `label`, `error`, `helperText`, `leftElement`, `rightElement`, `isLoading`) carecem de exemplos de uso contextualizado por produto.

**Proposta:** Haiku recebe a interface TypeScript do componente + o arquivo `.stories.tsx` correspondente e gera: (a) JSDoc para cada prop com descrição, tipo e exemplo; (b) um bloco MDX de documentação para Storybook `autodocs` com três exemplos contextualizados nos produtos IIT (Libri, Nitro, Brio). O output é estruturado em JSON com campos `jsdoc_additions` e `mdx_block`.

**Modelo:** Haiku 4.5 — extração de interface + geração de documentação técnica é task de baixa complexidade.

**Custo estimado:**
- Input: ~1.500 tokens por componente (interface + stories) com cache nas instruções → ~400 cobráveis
- Output: ~1.000 tokens (JSDoc + MDX)
- Por componente: 400 × $0,001 + 1.000 × $0,005 = **$0,0054 por componente**
- Para documentar os 9 componentes atuais: **$0,049** (custo único)
- Manutenção: 1-2 componentes novos/mês = **< $0,015/mês**

**Fallback:** Documentação manual existente permanece. Nenhuma degradação.

---

## 4. Detecção de inconsistências visuais via vision model

**Problema real:** O design system usa hardcoded hex values dentro dos arquivos de componentes (ex: `bg-[#0097D6]` no Button, cores inline no ProductPatterns.stories.tsx para temas de produto). Há risco de derive — um componente novo usar `#0098D7` em vez de `#0097D6`. Isso não é detectado por testes unitários.

**Proposta em dois níveis:**

**Nível 1 (texto, Haiku):** Script de auditoria que envia os arquivos `.tsx` de componentes para Haiku e pede extração de todos os valores hexadecimais usados, comparando com a paleta oficial em `colors.ts`. Output JSON com lista de divergências e arquivo/linha. Custo por auditoria: ~3.000 tokens de input × 9 componentes = ~27.000 tokens → **$0,027 por run completo**. Pode rodar mensalmente ou em CI antes de release.

**Nível 2 (visual, Sonnet com visão):** Screenshots do Storybook enviados para Sonnet com visão para detectar inconsistências visuais que texto não captura — espaçamentos fora do grid, ícones desalinhados, contraste insuficiente. Custo maior e retorno menor dado o estágio atual do design system. Recomendado diferir para quando o número de componentes dobrar (>18).

**Modelo nível 1:** Haiku 4.5. **Modelo nível 2:** Sonnet 4.6 com visão (diferido).

**Custo estimado nível 1:**
- $0,027 por auditoria completa × 12 meses = **$0,32/ano**

**Fallback:** Inspeção manual por diff de PR, que já acontece hoje.

---

## 5. Componentes de UI para IA — Aria (SocialMake) e Brio (attend-service)

**Problema real:** O Storybook já tem uma story `BrioAtendimento` que simula uma interface de chat WhatsApp usando Input + Button + Badge. Mas essa composição não existe como componente reutilizável na biblioteca. Qualquer produto que precise de uma interface de chat (Brio, futura Aria no SocialMake) recria a lógica de mensagens, bolhas, indicadores de digitação e badges de status IA do zero.

**Proposta:** Criar um módulo `@iit/ui/chat` com três componentes primitivos:

- `ChatMessage` — bolha de mensagem com props `from: 'user' | 'agent'`, `text`, `timestamp`, `status: 'sending' | 'sent' | 'error'`
- `ChatTypingIndicator` — três pontos animados, sinaliza que o agente está processando (crítico para UX de LLM com latência variável)
- `AgentBadge` — badge composto que combina o Badge existente com ícone de IA, para indicar `Brio IA`, `Aria IA`, `Atendente humano` de forma padronizada

**Integração com IA:** Esses componentes não chamam LLMs — são primitivos de UI. O valor está em padronizar a UX de IA em todos os produtos: mesmo `ChatTypingIndicator`, mesma animação de `sending`, mesmo padrão de `AgentBadge`. Quando Brio responde via Claude e SocialMake via Aria, o usuário vê o mesmo padrão visual de "agente pensando".

**Custo de implementação IA:** Zero de API — são componentes React puros. O uso de Haiku para acelerar a geração inicial do código dos três componentes (seguindo o padrão CVA existente) custaria ~$0,02 (one-time). O benefício é reuso em pelo menos dois produtos imediatamente (Brio + SocialMake) e potencialmente três (customer-service, attend-service, SocialMake).

**Fallback por design:** São componentes de UI sem dependência de API. Sempre disponíveis.

---

## Resumo de custo consolidado

| Oportunidade | Custo/request | Custo mensal estimado | Prioridade |
|---|---|---|---|
| Geração de variantes CVA | $0,0046 | < $0,02 | Alta |
| Geração de paleta de tokens | $0,0033 | < $0,01 | Média |
| Documentação de props (one-time) | $0,0054/componente | < $0,015 | Alta |
| Auditoria de consistência de cor | $0,027/run | < $0,03 | Média |
| Componentes Chat (Aria/Brio) | $0 de API | $0 | Alta |

**Total mensal projetado (cenário inicial):** < $0,08/mês. Sem dependência crítica em nenhum caso.

---

## Top 5 Movimentos

**Movimento 1 — Componentes de Chat como primitivos do design system**
Criar `ChatMessage`, `ChatTypingIndicator` e `AgentBadge` em `src/components/Chat/` seguindo o padrão CVA + dual-target (web + native). Critério de aceite: Brio e SocialMake importam `ChatMessage` de `@iit/ui` em vez de reimplementar bolhas de mensagem. Stories `BrioAtendimento` e futura `AriaCompose` usam esses primitivos.

**Movimento 2 — CLI de geração de variante assistida por Haiku**
Script em `scripts/generate-variant.ts` que recebe `<ComponentName> <VariantName> <hex>` e chama Haiku com os 4 arquivos do componente como contexto. Gera o diff e aplica via patch ou exibe para revisão. Critério de aceite: adicionar variante `warning` ao Button via `npx tsx scripts/generate-variant.ts Button warning #F59E0B` e o resultado passar em `vitest run`.

**Movimento 3 — Documentação automática de props via Haiku (batch one-time)**
Rodar Haiku contra os 9 componentes atuais para gerar JSDoc + bloco MDX `autodocs`. Custo total: < $0,05. Critério de aceite: Storybook exibe documentação de props com exemplos para todos os componentes sem texto manual adicional.

**Movimento 4 — Auditoria de consistência de cor em CI**
Script `scripts/audit-colors.ts` que extrai hexadecimais de todos os `.tsx` e compara com `colors.ts`. Primeiro passo é regex puro (zero custo de API). Se há ambiguidade semântica (comentários, nomes de variáveis), Haiku classifica a divergência. Critério de aceite: PR com cor fora da paleta oficial falha no lint antes de merge.

**Movimento 5 — Geração de paleta derivada para temas de produto**
CLI `scripts/generate-palette.ts <hex>` que chama Haiku com `colors.ts` como contexto e gera o objeto TypeScript completo da nova paleta. Critério de aceite: dado `#6366f1` (Libri/Nitro violet), o script produz um arquivo `tokens/colors.libri.ts` com todas as variantes (primaryLight, primaryDark, surfaceDark, status) que passa inspeção do designer sem ajuste manual.
