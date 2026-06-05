# Secao 04 — Backend/Build
> iit-ui | Panorama Estrategico 2026-06-05

---

## 1. Build System — Vite Library Mode

O projeto usa Vite 5 em lib mode com `vite-plugin-dts@3.9.0` para gerar declaracoes TypeScript. A configuracao basica esta correta para uma biblioteca ES:

**`vite.config.ts`**
```
formats: ['es'],
fileName: 'index',
external: ['react', 'react-dom', 'react/jsx-runtime'],
```

**Problemas encontrados:**

### BUG CRITICO — exports map referencia subpath que nunca e gerado

`package.json:16` declara:
```json
"./tokens": {
  "react-native": "./src/tokens/index.ts",
  "import": "./dist/tokens/index.js"
}
```

`vite.config.ts:13` define um unico entry point (`src/index.ts`) sem `preserveModules`. Com rollup em single-entry, o output e um arquivo `dist/index.js` unico. O arquivo `dist/tokens/index.js` **nunca sera gerado** pelo build atual.

Impacto: qualquer consumidor que fizer `import { colors } from '@iit/ui/tokens'` recebe erro `Cannot find module './dist/tokens/index.js'` em runtime. O subpath export esta quebrado.

Correcao necessaria: adicionar `preserveModules: true` + `preserveModulesRoot: 'src'` no `rollupOptions`, ou adicionar um segundo entry point dedicado.

### BUG — `./tokens` export map sem campo `types`

`package.json:15-18`: o subpath `./tokens` nao tem campo `"types"`. Ferramentas como `tsc` e editores com `moduleResolution: bundler` nao encontram as declaracoes `.d.ts` para o subpath. O subpath raiz `.` tem `"types": "./dist/index.d.ts"` (linha 13), mas `./tokens` esta omisso.

---

## 2. Exports e Tree-shaking

O entry `src/index.ts` usa `export * from './components'` e `export * from './tokens'`, e `src/components/index.ts` faz barrel re-exports de todos os 9 componentes.

Tree-shaking funciona em teoria com `formats: ['es']` — bundlers modernos (Vite, Next.js, webpack 5) conseguem eliminar componentes nao usados. Porem ha um problema latente:

### AVISO — `src/` publicado junto com `dist/`

`package.json:21-25`:
```json
"files": ["dist", "tailwind.config.ts", "src"]
```

O diretorio `src/` com todo o codigo TypeScript e publicado no pacote npm. Isso triplica o tamanho do pacote publicado (codigo-fonte + tipos gerados + artefatos). Nao e um bug funcional, mas e pratica ruim: expoe codigo interno e aumenta o download dos consumidores.

Justificativa atual (suspeita): o `react-native` conditional nos exports aponta para `src/`:
```json
"react-native": "./src/tokens/index.ts"
```
Ou seja, o `src/` esta sendo publicado para viabilizar o consumo React Native sem build. Esse e um padrao valido, mas deve ser documentado explicitamente.

---

## 3. Dependencias — peerDependencies e Versoes

### Mismatch react vs react-dom nas devDependencies

`package.json:83-84`:
```json
"react": "^18.3.0",
"react-dom": "^19.2.4"
```

React 18 e React-DOM 19 nao podem coexistir no mesmo ambiente — a combinacao causa aviso `react-dom` espera `react@19`. O ambiente de dev (Storybook, testes) esta rodando com versoes incompativeis. O `peerDependencies` declara `>=18` para ambos — correto em producao, mas a devDep misturada pode mascarar bugs de compatibilidade de versao.

### peerDependency `lucide-react` nao esta no external do rollup

`package.json:49-51`: `lucide-react` e declarado como peerDependency opcional.
`vite.config.ts:19`: o array `external` lista apenas `['react', 'react-dom', 'react/jsx-runtime']`.

Se qualquer componente futuro importar `lucide-react` diretamente (nao em stories/tests), ele sera **bundled** no `dist/index.js`, duplicando o pacote nos projetos consumidores. Atualmente nenhum componente web importa lucide-react (confirmado via grep), mas a config nao protege contra isso.

Correcao preventiva: adicionar `'lucide-react'` ao array `external` em `vite.config.ts:19`.

### `typescript@^6.0.2` — versao recente, verificar compat

TypeScript 6.0.2 existe (confirmado via npm). Porem `vite-plugin-dts@3.9.0` foi desenvolvido contra TypeScript 4.x/5.x. TypeScript 6 pode introduzir breaking changes na API interna do compilador usada pelo plugin. Recomenda-se fixar `typescript` em `~6.0.2` (patch) e testar o build antes de fazer bump.

---

## 4. TypeScript Strict Mode

`tsconfig.json` tem `"strict": true` (linha 17) com flags adicionais:
- `"noUnusedLocals": true` (linha 18)
- `"noUnusedParameters": true` (linha 19)
- `"noFallthroughCasesInSwitch": true` (linha 20)

Configuracao robusta. Porem ha um problema de conflito:

`tsconfig.json:9`:
```json
"allowImportingTsExtensions": true
```

Esta flag requer `"noEmit": true` em compiladores TypeScript padrao, porque o TS nao sabe resolver extensoes `.ts` em imports em runtime. O arquivo tem `"noEmit": false` (linha 12) combinado com `allowImportingTsExtensions: true` — configuracao contraditoria.

O motivo pelo qual o build nao quebra e que o Vite trata a resolucao de modulos independentemente do `tsc`. O comando `build: "tsc && vite build"` roda `tsc` primeiro para checar tipos (e gerar declaracoes via `declarationDir`), e em seguida o Vite faz o bundle. O `tsc` sozinho falha se algum import usar extensao `.ts` explicita — mas o codigo atual nao usa, entao passa. E uma bomba-relogio para imports futuros.

### Exportacao de tipos — `typography.native.ts`

`src/tokens/index.ts:2` exporta `export * from './typography'` (o arquivo web). O arquivo `typography.native.ts` define um `export const typography` com tipos numericos (React Native), mas **nao e re-exportado** em nenhum barrel. O conditional no exports map aponta para `src/tokens/index.ts` via `react-native`, que serve o token web — tipos incompativeis com StyleSheet do React Native.

---

## 5. Bugs com Arquivo:Linha

| # | Arquivo | Linha | Descricao | Severidade |
|---|---------|-------|-----------|------------|
| 1 | `package.json` | 16–18 | `dist/tokens/index.js` nunca gerado — subpath `./tokens` quebrado para web | CRITICO |
| 2 | `src/components/Modal/Modal.tsx` | 128 | `style={{ animation: 'iit-fadeIn 0.15s ease-out' }}` — keyframe registrado no Tailwind como `fadeIn`, nao `iit-fadeIn`; animacao silenciosa | ALTO |
| 3 | `package.json` | 84 | `react-dom@^19` no devDep com `react@^18` — versoes incompativeis no ambiente Storybook/vitest | MEDIO |
| 4 | `package.json` | 15–18 | Subpath `./tokens` sem campo `"types"` — sem autocomplete/type-check para consumidores | MEDIO |
| 5 | `tsconfig.json` | 9,12 | `allowImportingTsExtensions: true` + `noEmit: false` — contraditorios; `tsc --noEmit` falharia com imports `.ts` explicitos | BAIXO |
| 6 | `src/tokens/typography.native.ts` | 1–36 | Arquivo existe mas nao e exportado por nenhum barrel; morto | BAIXO |

---

## 6. Artifact de Build no Repositorio

`storybook-static/` esta **commitado no git** (108 arquivos trackeados confirmados). Nao existe `.gitignore` no repositorio. Artifacts de build nao devem ser versionados — aumentam o tamanho do clone, geram conflitos em PRs e tornam o historico git ilegivel.

O `Dockerfile` copia `storybook-static/` para deploy do Storybook via nginx. Isso exige que o build seja feito localmente antes do deploy — pratica fragil. O correto e construir o Storybook no CI e publicar a imagem, sem commitar o artifact.

---

## Top 5 Movimentos

### M1 — Corrigir subpath `./tokens` com `preserveModules` [CRITICO]
**Criterio de aceite:** `npm run build` gera `dist/tokens/index.js` e `dist/tokens/index.d.ts`. `import { colors } from '@iit/ui/tokens'` resolve sem erro em projeto consumidor com `moduleResolution: bundler`. Adicionar campo `"types": "./dist/tokens/index.d.ts"` no exports map.

### M2 — Corrigir nome da animacao no Modal [ALTO]
**Criterio de aceite:** `src/components/Modal/Modal.tsx:128` alterado para `animation: 'fadeIn 0.15s ease-out'` (alinhado com keyframe `tailwind.config.ts:68`). Teste visual confirma fade-in ao abrir Modal. Ou remover o `style` inline e usar apenas a classe Tailwind `animate-[fadeIn_0.15s_ease-out]` (linha 123), eliminando a duplicidade.

### M3 — Adicionar `.gitignore` e remover artifacts do git [ALTO]
**Criterio de aceite:** `.gitignore` criado com `storybook-static/`, `dist/`, `node_modules/`. `git rm -r --cached storybook-static dist` executado. Pipeline CI gera Storybook e publica imagem Docker sem precisar de build local. Reducao de >= 100 arquivos no historico git.

### M4 — Adicionar `lucide-react` ao `external` do rollup [MEDIO]
**Criterio de aceite:** `vite.config.ts:19` lista `lucide-react` em `external`. Build verificado com `grep 'lucide' dist/index.js` retornando vazio. Garante que peerDependency opcional nao vaze no bundle em uso futuro.

### M5 — Alinhar versoes react/react-dom nas devDependencies [MEDIO]
**Criterio de aceite:** `package.json:83-84` com `react@^18.3.0` e `react-dom@^18.3.0` (ambos 18) OU ambos `^19`. `npm install` sem warnings de peer dependency. Storybook e vitest rodam sem aviso de incompatibilidade. Se decisao for migrar para React 19, atualizar peerDependencies para `>=19` e documentar breaking change de semver.
