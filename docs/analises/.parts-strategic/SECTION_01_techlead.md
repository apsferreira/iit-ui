# Secao 01 - Tech Lead
> iit-ui | Panorama Estrategico 2026-06-05

---

## Bugs P0/P1

### [P0] Rules of Hooks - useId chamado condicionalmente em Select e Input

**Arquivo:** `src/components/Select/Select.tsx:20`
**Arquivo:** `src/components/Input/Input.tsx:14`

```ts
// Select.tsx:20
const selectId = id ?? React.useId()
```

O operador `??` aqui nao viola diretamente a regra pois `useId()` e sempre chamado, mas a intencao do codigo - usar o id externo quando disponivel - esta implementada de forma segura. O problema e diferente: `React.useId()` e chamado dentro de um `forwardRef` que pode ter SSR implicacoes. Porem ha um bug concreto: se `id` for passado como prop, o hook ainda executa mas o valor e descartado. Isso e correto - nao e bug de hook, e desperdicio aceitavel. Reclassificado como P1 de legibilidade.

**Correto:** o padrao `id ?? React.useId()` e valido no React 18. Mas o comentario permanece para registro.

### [P0] Skeleton com cor hardcoded dark-mode-only em light mode

**Arquivo:** `src/components/Skeleton/Skeleton.tsx:6`

```ts
const skeletonVariants = cva(
  'animate-pulse bg-[#1E1E28]',  // <- cor escura hardcoded, sem variante light
```

A cor `#1E1E28` e um cinza escuro que so funciona em dark mode. Em aplicacoes light-first (iit-ui e light-first per `tailwind.config.ts:12: darkMode: 'class'`), o Skeleton renderiza quase invisivel sobre fundos brancos/claros. Nao ha override para light mode. Todo consumidor do pacote que nao adicionou `.dark` na raiz ve um Skeleton com contraste proximo a zero sobre `#FFFFFF`.

Correto seria: `bg-[#E5E7EB] dark:bg-[#1E1E28]`

### [P0] Teste de Button verifica classe inexistente (falso-negativo garantido)

**Arquivo:** `src/components/Button/Button.test.tsx:33`

```ts
it('applies variant classes', () => {
  render(<Button variant="destructive">Delete</Button>)
  const btn = screen.getByRole('button')
  expect(btn.className).toContain('text-red-400')  // ERRADO
})
```

A implementacao real em `Button.tsx:35` usa `text-red-600`, nao `text-red-400`. O teste passa com `false positive` ou falha dependendo do ambiente de resolucao de CSS. Em ambiente jsdom sem CSS real, `className` contem a string Tailwind literal - entao o teste FALHA em execucao real pois `text-red-400` nunca aparece na string de classe. Isso significa que o comportamento de variante destructive esta **sem cobertura real** desde a criacao do componente.

Equivalente: `src/components/Badge/Badge.test.tsx:12` tem o mesmo problema:
```ts
expect(screen.getByText('OK').className).toContain('text-emerald-400')
// Badge.tsx usa text-[#00A87E], nao text-emerald-400
```

### [P1] Modal usa animacao com nome duplicado/conflitante

**Arquivo:** `src/components/Modal/Modal.tsx:122-129`

```tsx
className={cn(
  'animate-[fadeIn_0.15s_ease-out]',  // referencia ao keyframe 'fadeIn' do Tailwind
  ...
)}
style={{
  animation: 'iit-fadeIn 0.15s ease-out',  // sobrescreve com nome 'iit-fadeIn' (nao existe)
}}
```

O `style` inline tenta usar o keyframe `iit-fadeIn` que nao esta definido em nenhum lugar. O `tailwind.config.ts:68` define o keyframe como `fadeIn` (sem prefixo). O `style` inline sobrescreve o `animation` CSS gerado pelo Tailwind, resultando em animacao silenciosa (nenhuma animacao ocorre via inline style porque `iit-fadeIn` nao existe). O modal abre sem animacao em producao.

### [P1] Export "./tokens" sem campo "types" no package.json

**Arquivo:** `package.json:15-18`

```json
"./tokens": {
  "react-native": "./src/tokens/index.ts",
  "import": "./dist/tokens/index.js"
  // sem "types": "./dist/tokens/index.d.ts"
}
```

Consumidores TypeScript que importam `@iit/ui/tokens` diretamente nao recebem tipos via resolucao automatica de exports. O TypeScript tenta inferir do campo `import`, mas sem `types` explicito o moduleResolution `bundler`/`node16` pode falhar em projetos strict. O subpath `"."` tem `types` correto, mas `"./tokens"` nao.

### [P1] Card web e Card native tem temas invertidos (inconsistencia de modo)

**Arquivo:** `src/components/Card/Card.tsx:13-16` vs `src/components/Card/Card.native.tsx:83-89`

O `Card` web usa cores dark por padrao:
```ts
// Card.tsx:13
'rounded-xl border border-[#2A2A38] bg-[#111118] text-[#F4F4F8]'
```

O `Card` native usa cores light por padrao:
```ts
// Card.native.tsx:83
borderColor: colors.border.default,   // #D0DDE6 (light)
backgroundColor: colors.surface.base, // #FFFFFF (light)
```

Um componente compartilhado com semantica oposta entre plataformas. Quem porta layout web->native (ou vice-versa) recebe surpresa visual. O sistema de design nao tem posicao documentada sobre qual e o tema canonico do Card.

### [P1] CI nao executa testes nem lint antes do build

**Arquivo:** `.github/workflows/ci.yml`

O pipeline `CI - Build & Push Storybook` pula completamente `npm test` e `npm run lint`. Vai direto para `build-storybook`. PRs com testes quebrados ou erros de TypeScript chegam ao main sem gate automatizado. O `publish-npm.yml` tambem nao roda testes antes de publicar o pacote.

---

## Planejado vs Construido vs Gap

| Dimensao | Planejado | Construido | Gap |
|---|---|---|---|
| Componentes web | Design system completo (Button, Input, Select, Textarea, Badge, Card, Modal, Skeleton, EmptyState) | 9 componentes implementados e exportados | Faltam: Tooltip, Toast/Snackbar, Table, Tabs, Checkbox, Radio, Switch, DatePicker, Pagination |
| Componentes native | Paridade com web | Button, Badge, Card com `.native.tsx` | Input, Modal, Select, Textarea, EmptyState, Skeleton sem variante native |
| Token system | Cores + tipografia exportaveis, usaveis em web e native | `colors.ts`, `typography.ts`, `typography.native.ts` exportados | Spacing, shadows e border-radius nao tem tokens proprios - estao hardcoded nos componentes |
| Tailwind preset | Config compartilhavel via `@iit/ui/tailwind` | `tailwind.config.ts` com cores iit, fontes e keyframes | `content` aponta so para `./src` - consumidor precisa adicionar seu proprio path manualmente |
| Build/distribuicao | ES module tree-shakeable, tipos gerados, subpaths | Vite lib mode ES-only, `vite-plugin-dts`, exports no package.json | Sem CJS fallback; `./tokens` sem campo `types`; CSS nao e emitido no dist |
| Dark mode | Suporte via `darkMode: 'class'` | Button, Badge, Input, Select, Modal, Textarea tem light only; Card tem dark only hardcoded; EmptyState tem dark parcial | Skeleton invisivel em light; Card invertido em native vs web; sem CSS variables para theming |
| Testes | Cobertura de comportamento para todos os componentes | 9 suites de teste, ~35 casos | 2 testes com assertions erradas (Button destructive, Badge success); CI nao roda testes; sem teste de acessibilidade automatizado |
| CI/CD | Build, lint, test, publish automatizados | CI builda Storybook + push Docker; publish por tag | Sem step de lint/test no CI; sem step de type-check; publish nao versiona automaticamente |
| Storybook | Documentacao visual interativa | Stories para todos os 9 componentes + DesignTokens + ProductPatterns | `storybook-static/` commitado no repo (ruido no git); sem chromatic ou snapshot testing |
| Acessibilidade | WCAG 2.1 AA | Focus ring em todos os componentes interativos; aria-labels presentes | Skeleton sem `role="status"` ou texto para SR; Modal fecha no Escape mas sem `aria-live` para anunciar abertura |

---

## Top 5 Movimentos

### Movimento 1 - Corrigir Skeleton para light mode

**Prioridade:** P0 - impacta todos os consumidores em light mode (todos os produtos IIT)

**Acao:** Substituir a cor hardcoded dark em `Skeleton.tsx:6` por par light/dark:

```ts
'animate-pulse bg-[#E5E7EB] dark:bg-[#1E1E28]'
```

Adicionar variante `text` com altura semantica: `h-4` atual e valida, manter.

**Criterio de aceite mensuravel:**
- Skeleton com `variant="block"` renderiza com contraste minimo 3:1 contra fundo `#FFFFFF` em light mode (verificavel via axe-core ou calculo manual: `#E5E7EB` sobre `#FFFFFF` = ratio ~1.5 - ainda insuficiente WCAG; usar `#D1D5DB` que da ratio ~1.9 - aceitavel para elemento decorativo `aria-hidden`)
- Teste unitario adicionado: `expect(el.className).toContain('bg-[#D1D5DB]')` em light e `dark:bg-[#1E1E28]` visivel no className
- `npm test` verde sem regressao

### Movimento 2 - Corrigir animacao do Modal e unificar nome do keyframe

**Prioridade:** P0 - animacao de abertura nao funciona em producao

**Acao:** Remover o `style` inline conflitante em `Modal.tsx:127-129` e usar apenas a classe Tailwind:

```tsx
// remover:
style={{
  animation: 'iit-fadeIn 0.15s ease-out',
}}

// manter apenas:
'animate-[fadeIn_0.15s_ease-out]'
// ou migrar para token: 'animate-fadeIn' (ja definido no tailwind.config.ts:74)
```

**Criterio de aceite mensuravel:**
- Em Storybook: abrir Modal e confirmar que a animacao de escala 0.96->1 ocorre visivelmente (~150ms)
- Teste de regressao: `Modal.test.tsx` ja cobre abertura/fechamento; adicionar 1 caso que verifica presenca da classe `animate-fadeIn` no elemento dialog
- Nenhum `style` inline sobrescrevendo `animation` no componente final

### Movimento 3 - Adicionar gates de lint e test no CI

**Prioridade:** P1 - PRs com testes quebrados chegam ao main sem bloqueio

**Acao:** Reestruturar `.github/workflows/ci.yml` em dois jobs sequenciais:

```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4       # nao v6 - versao inexistente hoje
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test

  build-and-push:
    needs: quality
    # ... restante igual
```

Idem para `publish-npm.yml`: adicionar `npm test` antes de `npm publish`.

**Criterio de aceite mensuravel:**
- Abrir PR com teste quebrado -> CI falha no job `quality` antes de buildar Docker
- Tempo total do pipeline nao ultrapassa 8 minutos (quality ~2min + build ~5min)
- Badge de CI no README reflete status real do pipeline

### Movimento 4 - Corrigir assertions erradas nos testes de Button e Badge

**Prioridade:** P1 - falsos negativos mascaram regressoes de variante

**Acao - Button.test.tsx:33:**
```ts
// atual (errado):
expect(btn.className).toContain('text-red-400')
// correto:
expect(btn.className).toContain('text-red-600')
```

**Acao - Badge.test.tsx:12:**
```ts
// atual (errado):
expect(screen.getByText('OK').className).toContain('text-emerald-400')
// correto:
expect(screen.getByText('OK').className).toContain('text-[#00A87E]')
```

Adicionalmente, revisar se assertions por `className.toContain()` sao a estrategia certa para uma biblioteca sem CSS runtime - considerar mover para data-testid ou testes de comportamento visual via Storybook + Chromatic.

**Criterio de aceite mensuravel:**
- `npm test` roda 100% verde incluindo os casos corrigidos
- Nenhuma assertion referencia classe Tailwind que nao existe no codigo-fonte do componente testado
- Adicionar teste de comportamento para `variant="destructive"`: verificar que o botao recebe `disabled` quando `isLoading=true` (ja coberto) + que nao dispara `onClick` quando `disabled` (nao coberto)

### Movimento 5 - Corrigir export "./tokens" e adicionar CSS ao dist

**Prioridade:** P1 - consumidores TypeScript com subpath imports falham silenciosamente

**Acao A - package.json:**
```json
"./tokens": {
  "react-native": "./src/tokens/index.ts",
  "import": "./dist/tokens/index.js",
  "types": "./dist/tokens/index.d.ts"
}
```

**Acao B - vite.config.ts:** Adicionar multiplos entry points para garantir que `dist/tokens/index.js` e gerado:
```ts
entry: {
  index: resolve(__dirname, 'src/index.ts'),
  'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
},
```

**Acao C - CSS:** `src/global.css` nao e emitido no `dist/`. Consumidores precisam copiar o CSS manualmente ou configurar o import do Google Fonts por conta propria. Adicionar instrucao explicita no README e avaliar emitir `dist/style.css` via Vite.

**Criterio de aceite mensuravel:**
- `import { colors } from '@iit/ui/tokens'` em projeto TypeScript com `moduleResolution: "bundler"` resolve tipos sem erro `ts(2307)`
- `ls dist/tokens/` mostra `index.js` e `index.d.ts` apos `npm run build`
- Teste de smoke: criar projeto Next.js 14 temporario, instalar `@iit/ui` via `file:../iit-ui/dist` e importar `{ colors }` sem erro de tipo

---

## Notas de Arquitetura

**Build system:** Vite lib mode com `vite-plugin-dts` e solido para ES modules. A ausencia de CJS nao e problema para o ecossistema atual (todos os frontends IIT usam Vite/ESM), mas deve ser documentado como decisao explicita.

**Tree-shaking:** Funciona corretamente. Cada componente usa `export const` sem side effects, e o `rollupOptions.external` externaliza React corretamente. O `export *` no barrel `src/index.ts` nao quebra tree-shaking com bundlers modernos (Vite, webpack 5).

**Paridade native:** O modelo de `.native.tsx` paralelo e a abordagem correta para React Native Web. O problema atual e que apenas 3 dos 9 componentes tem variante native, e o `tsconfig.json:23` ja tem o path alias `react-native -> react-native-web` configurado para compilacao web.

**Versao do TypeScript:** `"typescript": "^6.0.2"` no devDependencies. TypeScript 6.x e pre-release/beta - pode introduzir breaking changes em checagem strict. Recomendavel fixar em `^5.7.0` ate TS 6 ter release estavel.
