# iit-ui — Context

## Propósito

Biblioteca de componentes e design tokens compartilhada entre todos os frontends do **Instituto Itinerante**. Publicada como pacote npm (`@iit/ui`) no GitHub Packages e consumida como dependência nos apps do ecossistema IIT. Light mode first, Tailwind-powered, com variantes React Native para apps mobile.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Linguagem | TypeScript 6.x |
| Framework (web) | React 18 + Tailwind CSS 3 |
| Framework (mobile) | React Native 0.72+ (peer dep) |
| Build | Vite 5 + vite-plugin-dts |
| Variantes de classe | class-variance-authority (CVA) |
| Utilitários de classe | clsx + tailwind-merge (`cn()`) |
| Testes | Vitest + Testing Library |
| Documentação | Storybook 8 |
| Registro | GitHub Packages (npm.pkg.github.com) |

## Linguagem ubíqua

| Termo | Definição |
|-------|-----------|
| **Design Token** | Variável tipada que representa um valor visual (cor, fonte, raio) — fonte única de verdade da identidade IIT |
| **IIT Blue** | `#0097D6` — cor primária oficial do Instituto Itinerante, usada em CTAs principais e foco |
| **Teal** | `#00D6A0` — cor secundária (`brand.secondary`), usada em CTAs secundários e status de sucesso |
| **surface** | Grupo de tokens de fundo para light mode (`base`, `subtle`, `elevated`) |
| **surfaceDark** | Grupo de tokens de fundo para dark mode, família azul-escuro derivada do IIT Blue |
| **variant** | Prop de estilo com opções fixas tipadas via CVA (ex: `primary`, `secondary`, `ghost`) |
| **cn()** | Utilitário que combina `clsx` + `tailwind-merge` para composição segura de classes Tailwind |
| **native** | Sufixo de arquivos (`Button.native.tsx`) que indica implementação React Native (usa StyleSheet, não Tailwind) |
| **Skeleton** | Componente de placeholder animado durante carregamento de conteúdo |
| **EmptyState** | Componente para ausência de dados em listas ou seções |
| **focus ring** | Anel visual acessível aplicado em todos os interativos via `ring-[#0097D6]` |

## Limites (bounded context)

- **Possui:** tokens de cor e tipografia oficiais IIT; componentes React web; variantes React Native; config Tailwind base exportável; utilitário `cn()`; stories Storybook; build ESM publicável
- **NÃO possui:** lógica de negócio; estado de aplicação; chamadas de API; autenticação; roteamento; temas por produto (cada app herda via preset Tailwind)
- **Upstream/downstream:** nenhum serviço upstream — é uma leaf dependency. Downstream: todos os frontends do ecossistema IIT que declaram `@iit/ui` como dependência

## Mapa de módulos

| Caminho | O que faz |
|---------|-----------|
| `src/index.ts` | Entry point principal — re-exporta components, tokens e `cn()` |
| `src/tokens/colors.ts` | Paleta oficial IIT (brand, surface, surfaceDark, text, border, status) |
| `src/tokens/typography.ts` | Tokens de fonte para web (Inter, JetBrains Mono) |
| `src/tokens/typography.native.ts` | Tokens de fonte para React Native |
| `src/components/Button/` | Botão com 5 variantes, 3 sizes, `isLoading`, ícones — web + native |
| `src/components/Card/` | Container com subcomponentes: Header, Title, Description, Body, Footer |
| `src/components/Input/` | Campo de texto com label, error, helperText, elementos laterais |
| `src/components/Modal/` | Dialog com focus trap, Esc para fechar, 4 tamanhos — web + native |
| `src/components/Badge/` | Indicador de status com variantes e prop `dot` |
| `src/components/Skeleton/` | Placeholder animado (block, text, circle) |
| `src/lib.ts` | Utilitário `cn()` (clsx + tailwind-merge) |
| `tailwind.config.ts` | Preset Tailwind exportado como `@iit/ui/tailwind` para apps consumidores |
| `src/stories/` | Stories Storybook: Introduction, DesignTokens, ProductPatterns |

## Pontos de entrada

- **Build:** `vite build` a partir de `src/index.ts` → gera `dist/index.js` (ESM) + tipos
- **Storybook:** `storybook dev -p 6006` — visualização interativa de todos os componentes
- **Docs site:** `docs/` (Astro) com `npm run dev` — site estático de documentação
- **Consumo em apps:** `import { Button, colors, cn } from '@iit/ui'` após instalar o pacote
