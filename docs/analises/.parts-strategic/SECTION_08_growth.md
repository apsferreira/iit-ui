# Seção 08 — Growth
> iit-ui | Panorama Estratégico 2026-06-05

---

## Score: 6/10

A biblioteca existe, tem estrutura sólida e já serve como base de referência visual para o ecossistema. Mas o impacto comercial hoje é quase zero: nenhum produto de usuário final consome `@iit/ui` em produção, a duplicação de componentes nas codebases é a norma, e o Storybook — principal canal de DX — não está deployado publicamente. O potencial está mapeado; a execução está parada.

---

## 1. DX como fator de adoção interna

O iit-ui tem o mínimo necessário para uma boa DX: Storybook 8 configurado, stories para todos os 9 componentes estáveis, ProductPatterns documentando composições reais por produto, e exemplos de instalação/uso na Introduction story. O utilitário `cn()` está disponível, o preset Tailwind é exportável, e os tipos TypeScript cobrem props públicas.

O que falta é o próximo nível de DX que transforma uma biblioteca boa em uma biblioteca adotada:

- **Storybook sem URL pública.** O diretório `storybook-static/` existe, mas não há evidência de deploy contínuo. Um novo dev que queira explorar os componentes precisa clonar o repo e rodar `storybook dev` localmente — barreira suficiente para a maioria simplesmente copiar o que já existe no projeto onde está trabalhando.
- **Zero changelog.** Não há `CHANGELOG.md` nem controle de breaking changes. Em versão `0.1.0`, qualquer update pode quebrar silenciosamente os consumidores.
- **Ausência de codesandbox/stackblitz embed.** As stories são interativas no Storybook, mas não há playground externo para testar sem instalar nada.
- **Instalação requer .npmrc manual.** O GitHub Packages exige configuração de registry por scope. Esse atrito inicial é real e invisível para quem não conhece o setup.

**Nota DX: 5/10.** A fundação existe mas não foi empurrada até o ponto de auto-divulgação.

---

## 2. Consistência visual como fator de crescimento dos produtos

O maior argumento de valor do iit-ui para o negócio é simples: cada produto IIT que o usuário final usa precisa transmitir que pertence à mesma empresa. Hoje isso não acontece porque os produtos não compartilham a biblioteca.

Os tokens estão bem definidos: IIT Blue `#0097D6`, Teal `#00D6A0`, escala de superfície, texto e status semântico. O preset Tailwind exportável via `@iit/ui/tailwind` é o mecanismo correto para propagar esses tokens sem forçar os produtos a depender dos componentes em si.

O problema é que o mecanismo não foi ativado. SocialMake, my-library (Libri) e focus-hub (Nitro) — os três produtos mais maduros do ecossistema — têm suas próprias pilhas de componentes locais que duplicam os tokens de cor do iit-ui usando os mesmos valores hexadecimais hard-coded nos arquivos, sem importar de `@iit/ui`. A consistência existe por disciplina manual do autor, não por sistema. Quando um token precisar mudar — e vai — a mudança terá que ser feita em 4+ lugares.

Para o crescimento dos produtos: um usuário que migra do Libri para o Nitro espera alguma familiaridade visual. Hoje essa familiaridade depende de o dev lembrar de usar as mesmas cores. Isso não escala com time.

---

## 3. Velocidade de desenvolvimento: custo da duplicação

A duplicação é direta e quantificável. As mesmas abstrações estão implementadas em pelo menos três lugares:

| Componente | iit-ui | focus-hub/ui | my-library/ui |
|------------|--------|--------------|---------------|
| Button     | sim    | sim (fork com framer-motion) | sim |
| Card       | sim    | sim (fork com framer-motion) | sim |
| Input      | sim    | sim | sim |
| EmptyState | sim    | sim | sim |
| Badge      | ausente no focus-hub | ausente | sim |
| Skeleton   | sim    | ausente (SkeletonLoader local) | sim (SkeletonLoader local) |
| Select     | sim    | ausente | sim |
| Modal      | sim    | (UpgradeModal local) | (ConfirmDialog local) |

Estimativa conservadora: cada componente duplicado representa 4-8h de desenvolvimento inicial mais manutenção contínua. Com 6-7 componentes duplicados em 2 projetos adicionais, o custo acumulado já supera 50-80h de engenharia. Para um time pequeno com um Engineering Manager solo no topo, esse é um número que importa.

Além do custo de criação, há o custo de divergência. O Button do focus-hub já divergiu do iit-ui: adicionou `framer-motion` (animação de hover/tap), um alias `loading` além de `isLoading`, e uma variante `success` que o iit-ui não tem. O Card do focus-hub adicionou `initial/animate` do framer-motion, entrada animada padrão. Essas extensões são legítimas — mas quando o iit-ui precisar de um bug fix nos estados de foco, os forks não vão receber o fix automaticamente.

**Estimativa de tempo perdido por produto por mês:** 2-4h em manutenção de componentes que existem na biblioteca central. Multiplicado por 3-4 produtos ativos, o custo de oportunidade mensal supera o esforço de uma migração planejada.

---

## 4. Gaps de componentes reinventados em cada produto

Além dos componentes que existem no iit-ui e foram duplicados, há padrões que cada produto implementa do zero por ausência na biblioteca central:

**Componentes ausentes no iit-ui que aparecem em múltiplos produtos:**

- **Toast/Notification:** focus-hub e my-library ambos têm notificações implementadas localmente. O iit-ui lista Toast como "planned" há indícios que o planejamento não evoluiu para implementação.
- **ProgressBar:** my-library tem barras de progresso de leitura implementadas com CSS inline. iit-ui lista como "planned".
- **Avatar:** cada produto que precisa exibir perfil de usuário resolve por conta própria.
- **Tabs:** padrão de navegação comum em dashboards de produto — focus-hub implementa por fora.
- **Tooltip:** iit-ui lista como "planned"; focus-hub usa `title` nativo ou implementa por CSS.
- **SkeletonLoader:** my-library tem `SkeletonLoader.tsx` e focus-hub teria um equivalente — ambos reinventam o padrão que o iit-ui já resolve melhor com variantes `block/text/circle`.
- **ConfirmDialog/ModalDestructive:** my-library tem `ConfirmDialog.tsx` separado do Modal base. O Modal do iit-ui não tem pattern documentado de confirmação destrutiva.

**Componentes produto-específicos que deveriam estar no iit-ui:**

- **DataTable ou List com estado vazio:** padrão recorrente em todos os produtos (lista de livros, lista de tarefas, calendário de posts). Hoje cada um implementa o wrapper da lista + EmptyState integrado de forma diferente.
- **StatCard:** focus-hub tem cards de estatística (2/4 tarefas, 2h30 foco, 340 XP); my-library tem StatCardSkeleton. Padrão recorrente sem abstração compartilhada.

---

## 5. Design system como diferencial competitivo

No contexto do IIT, o argumento de diferencial competitivo tem duas dimensões.

**Dimensão interna (velocidade):** um design system maduro permite lançar novos produtos em semanas em vez de meses. Quando food-marketplace e jiu-jitsu-academy precisarem de frontend, o esforço de UI pode cair 40-60% se a biblioteca estiver consolidada. Hoje esse ganho não existe porque a biblioteca não está sendo consumida.

**Dimensão externa (percepção):** o design system é a âncora que mantém o SocialMake parecendo SocialMake e o Libri parecendo Libri enquanto ambos pertencem ao mesmo ecossistema. Para o usuário final isso se traduz em confiança — a percepção de que é uma empresa profissional, não uma coleção de projetos side-project. Para o CEO que é o fundador visível, a consistência visual entre produtos reforça a narrativa de ecossistema que legitima o IIT como empresa de tecnologia, não como freelancer com vários produtos.

**Onde o diferencial está sendo perdido:** o Storybook sem deploy público significa que o design system não é visível fora do time. Não tem como referenciar a um potencial parceiro, investidor ou colaborador externo. A URL `#` nos "Links úteis" da Introduction story é sintomática — o sistema existe mas não tem endereço público.

**Onde o diferencial pode ser capturado:** o iit-ui já tem ProductPatterns stories que mostram o Libri, o Nitro, o SocialMake e o Brio em composições reais. Isso é o começo de um portfólio visual do ecossistema. Um Storybook deployado em `ui.institutoitinerante.com.br` seria a forma mais eficiente de comunicar maturidade técnica e coerência de produto.

---

## 6. Evidências de adoção (ou ausência dela)

A busca por `@iit/ui` em todos os `package.json` do ecossistema retornou apenas dois resultados além do próprio repo: `docs/package.json` (o site de documentação, consumidor trivial) e `iit-agents/frontend-react/package.json`. Nenhum dos produtos comerciais — SocialMake, my-library, focus-hub — declarou a dependência.

Isso significa que o iit-ui v0.1.0, com 9 componentes estáveis, Storybook funcional e tokens tipados, está em produção em zero produtos IIT voltados ao usuário final. A biblioteca existe como infraestrutura sem consumidor.

As causas prováveis, em ordem de impacto:

1. Ausência de migração planejada: os produtos foram construídos em paralelo ao iit-ui sem um momento de "agora migramos".
2. Atrito de instalação do GitHub Packages: requer `.npmrc` com token, diferente de um pacote npm público.
3. Ausência de versão publicada com changelog: a versão `0.1.0` no `package.json` não equivale a um pacote publicado e rastreável.
4. Os forks locais já funcionam: sem dor ativa, não há urgência de migrar.

---

## Top 5 Movimentos

### M1 — Deploy do Storybook em URL pública
**O que:** `ui.institutoitinerante.com.br` com deploy automático a cada push em main via GitHub Actions + Cloudflare Pages (ou K3s ingress).
**Critério de aceite:** URL pública acessível sem login; action de deploy passa verde; Introduction story carrega em menos de 3s; URL referenciada no README e no CONTEXT.md.
**Por que agora:** sem URL pública, o design system não existe para ninguém além do autor. É o pré-requisito de tudo que vem depois.

### M2 — Publicar `@iit/ui` no GitHub Packages com CI
**O que:** configurar step de `npm publish` na action de release; tag semântica dispara publish; CHANGELOG.md gerado automaticamente.
**Critério de aceite:** `npm install @iit/ui@0.1.0` funciona em um novo projeto com `.npmrc` configurado; versão aparece em `https://github.com/apsferreira/iit-ui/packages`; README documenta o setup do `.npmrc`.
**Por que agora:** sem pacote publicado rastreável, nenhum produto pode depender do iit-ui com confiança em updates.

### M3 — Migrar focus-hub para consumir `@iit/ui`
**O que:** substituir `src/components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`, `EmptyState.tsx` do focus-hub pelos imports de `@iit/ui`; manter extensões produto-específicas (framer-motion, variantes extras) em camada local que estende os componentes base.
**Critério de aceite:** `grep -r "from '../components/ui'" focus-hub/frontend/src` retorna zero ocorrências; testes do frontend passam; sem regressão visual (comparação de screenshots antes/depois no Storybook).
**Por que agora:** focus-hub é o produto mais ativo do Antonio em código — migrar aqui valida o processo de adoção antes de aplicar nos outros.

### M4 — Implementar os 5 componentes "planned" em ordem de demanda real
**O que:** em ordem — Toast, ProgressBar, Avatar, Tabs, Tooltip. Cada um com story, variantes CVA, versão native quando aplicável, e adicionado ao catálogo da Introduction story.
**Critério de aceite:** cada componente tem story "stable" no Storybook; pelo menos um ProductPattern atualizado usando o componente novo; componente exportado em `src/components/index.ts` e visível no Storybook deployado.
**Por que agora:** Toast e ProgressBar são os mais reinventados localmente (SkeletonLoader de my-library já resolve parte do Skeleton, mas ProgressBar é novo). Cada componente adicionado ao iit-ui é um que deixa de ser reinventado nos próximos produtos.

### M5 — Criar guia de migração + ADR de "iit-ui como dependência obrigatória"
**O que:** documento `docs/MIGRATION.md` com passo a passo de como um produto existente adiciona o iit-ui (setup .npmrc, extender tailwind config, substituir componentes locais); ADR em `docs/adr/` formalizando a decisão de que novos produtos IIT não podem ter componentes ui locais que replicam o catálogo do iit-ui.
**Critério de aceite:** MIGRATION.md tem menos de 300 linhas e pode ser executado por um dev sem contexto prévio do ecossistema em menos de 2h; ADR aprovado (merge em main) com link no CONTEXT.md; próximo produto criado no ecossistema declara `@iit/ui` no `package.json` desde o commit inicial.
**Por que agora:** sem decisão formalizada, cada novo produto vai repetir o padrão de "crio local por enquanto" — e o "por enquanto" vira permanente.
