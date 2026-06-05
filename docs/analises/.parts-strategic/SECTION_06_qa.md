# Secao 06 — QA
> iit-ui | Panorama Estrategico 2026-06-05

---

## 1. Estado Atual da Cobertura de Testes

### Componentes com testes

Todos os 9 componentes possuem arquivo de teste. Cobertura estrutural por componente:

| Componente | Arquivo de teste | Casos cobertos | Gaps identificados |
|---|---|---|---|
| Button | `Button.test.tsx` | render, click, disabled, isLoading, variant, size | leftIcon/rightIcon sem teste; focus-visible nao verificado |
| Badge | `Badge.test.tsx` | render, variant success, dot indicator | 4 variantes nao testadas (warning, error, info, brand); dot color nao verificado por variante |
| Input | `Input.test.tsx` | label, error, aria-invalid, helperText | leftElement/rightElement sem teste; disabled sem teste; associacao label->input nao verificada |
| Textarea | `Textarea.test.tsx` | label, error, showCount, update count | controlled/uncontrolled sem teste; maxLength overflow nao verificado |
| Select | `Select.test.tsx` | label, render options, error | placeholder sem teste; disabled option sem teste; helperText sem teste |
| Modal | `Modal.test.tsx` | open/close, onClose button, overlay click, title+description | Escape key sem teste; focus trap sem teste; size variants sem teste; hideCloseButton sem teste |
| Card | `Card.test.tsx` | render children, header/footer | hoverable sem teste; CardDescription sem teste |
| Skeleton | `Skeleton.test.tsx` | aria-hidden, circle variant, custom dimensions | text variant sem teste; animacao nao verificada |
| EmptyState | `EmptyState.test.tsx` | title, description, action button, className | iconColor/iconBgColor sem teste |

Estimativa de cobertura de branches: **~40-50%**. A meta da biblioteca e 80% em servicos criticos — iit-ui como design system compartilhado deve seguir o mesmo padrao pois bugs aqui propagam para todos os produtos.

### Ausencia de threshold configurado

`vitest.config.ts` (linha 1-11) nao define `coverage` com `thresholds`. Nao ha gate automatico: testes podem passar com 0% de cobertura adicional sem alarme no CI.

### CI nao executa testes

`.github/workflows/ci.yml` (linha 33-34) executa apenas `npm run build-storybook`. O script `test` existe no `package.json` (linha 33) mas nao e invocado em nenhum job do workflow. PRs podem ser mergeados sem que os testes rodem.

---

## 2. Issues Conhecidas

### Issue #21 — Falsos negativos Button/Badge

Os testes de variante usam `expect(btn.className).toContain('text-red-400')` para `destructive` (`Button.test.tsx:33`) e `expect(screen.getByText('OK').className).toContain('text-emerald-400')` para Badge success (`Badge.test.tsx:12`).

Problema: `class-variance-authority` gera classes dinamicamente e o output real de Button destructive e `text-red-600` (ver `Button.tsx:35`), nao `text-red-400`. Badge success usa `text-[#00A87E]` (ver `Badge.tsx:11`), nao `text-emerald-400`. Ambos os asserts passam como falso negativo apenas se os valores esperados coincidirem com o que CVA gera — ou pior, falham silenciosamente se `className` vier como objeto de proxy no ambiente de teste.

Correcao correta: testar comportamento, nao classes. Para `destructive`, verificar que o botao renderiza com a semantica correta (ex: aria ou texto) ou usar `toMatchInlineSnapshot` do className real uma vez e travar.

### Issue #27 — Rules of Hooks em Input/Textarea/Select

`Input.tsx:14` chama `React.useId()` dentro de um `React.forwardRef`, que e aceito pelo React, mas a linha exata e:

```
const inputId = id ?? React.useId()
```

O problema nao e `forwardRef` per se — e que `useId` e chamado condicionalmente via operador `??`. Se `id` for `undefined` em um render e uma string no proximo (controlled externo), o numero de hooks muda entre renders violando a Rules of Hooks. Na pratica isso ocorre quando um componente pai passa `id` como prop opcional que pode mudar de `undefined` para valor definido. O mesmo padrao existe em `Textarea.tsx:14` e `Select.tsx:20`.

Fix correto: chamar `useId` incondicionalmente e resolver o fallback depois:

```tsx
const generatedId = React.useId()
const inputId = id ?? generatedId
```

Essa correcao e necessaria antes de qualquer consumo em producao — o bug pode ser silencioso em dev mas crashar em StrictMode duplo-render.

---

## 3. Acessibilidade

### O que esta correto

- Input/Textarea/Select: `aria-invalid`, `aria-describedby` linkando ao error/helper, `label` com `htmlFor`. Implementacao solida (`Input.tsx:36-39`).
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, `aria-label="Close dialog"`, focus trap implementado (`Modal.tsx:38-87`), Escape key handler presente.
- Skeleton: `aria-hidden="true"` correto (`Skeleton.test.tsx:8`).
- EmptyState: `role="status"`, `aria-label={title}`, icone com `aria-hidden="true"` (`EmptyState.tsx:39-41`).
- Badge dot: `aria-hidden="true"` no indicador visual (`Badge.tsx:48`).

### Gaps de acessibilidade

1. **Button — sem `aria-label` para estados com icone apenas**: `leftIcon`/`rightIcon` podem ser usados sem texto filho. Um `<Button leftIcon={<Trash2/>} />` sem children fica sem nome acessivel.

2. **Button — `aria-busy` semantica incompleta**: `aria-busy={isLoading}` (`Button.tsx:67`) e booleano mas o tipo do atributo HTML espera string `"true"/"false"`. Testado como `toHaveAttribute('aria-busy', 'true')` no teste — funciona em jsdom mas pode divergir em browsers reais.

3. **Modal — focus trap nao testado**: A logica de Tab/Shift+Tab e Escape esta implementada (`Modal.tsx:60-83`) mas nenhum teste verifica esse comportamento. E o path de acessibilidade mais critico do componente.

4. **Select — `aria-required` ausente**: Nao ha prop `required` propagando `aria-required` para o `<select>`, embora `required` nativo seja passado via spread `{...props}`.

5. **Card — sem semantica de regiao**: `Card` e uma `div` sem role. Para uso como cartao de conteudo, consumidores precisam adicionar `role` manualmente — ausencia de documentacao disso e risco.

6. **Storybook a11y addon instalado mas nao auditado no CI**: `@storybook/addon-a11y` esta no `package.json` (linha 68) e configurado em `.storybook/main.ts` (linha 7), mas o CI so faz build do Storybook — nao roda `storybook test` com a11y assertions automatizadas.

---

## 4. Visual Regression — Storybook sem Chromatic

**Storybook**: presente e funcional. Stories cobrindo todos os 9 componentes com variantes (`Button.stories.tsx`, etc). Addon `addon-essentials` e `addon-interactions` instalados. `storybook-dark-mode` instalado.

**Chromatic**: ausente. Nenhuma referencia a `chromatic` em `package.json`, `.github/workflows/`, ou `.storybook/`. O CI apenas builda o Storybook como imagem Docker e publica no GHCR para visualizacao — nao ha snapshot de referencia nem diff automatico.

**Consequencia pratica**: qualquer mudanca de classe Tailwind, token de cor ou espacamento passa sem alarme visual. Um PR que altere `#0097D6` para `#0098D7` em `Button.tsx:8` seria mergeado silenciosamente afetando todos os produtos consumidores (focus-hub, my-library, auth-service).

**Alternativa viavel sem custo Chromatic**: `@storybook/test-runner` com `toMatchImageSnapshot` do `jest-image-snapshot` em CI, ou `Percy` no plano free. Custo de setup: ~4h.

---

## 5. Plano para Chegar a 80% de Cobertura

### Configuracao imediata (dia 1)

Adicionar ao `vitest.config.ts`:

```ts
test: {
  coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov'],
    thresholds: {
      lines: 80,
      branches: 75,
      functions: 80,
      statements: 80,
    },
    include: ['src/components/**'],
  }
}
```

Adicionar ao CI (`ci.yml`) antes do build do Storybook:

```yaml
- name: Test
  run: npm run test -- --coverage
```

### Testes a adicionar por prioridade

**Alta (bugs ativos — Issues #21 e #27):**
- Button: reescrever asserts de variante usando `data-testid` ou snapshot; adicionar testes para `leftIcon`/`rightIcon`; testar `aria-label` em botao icone-only
- Badge: reescrever assert `text-emerald-400` para testar variante correta; cobrir `warning`, `error`, `info`, `brand`

**Media (paths nao cobertos):**
- Modal: teste de Escape key (`fireEvent.keyDown(document, { key: 'Escape' })`); teste de focus trap; teste `hideCloseButton`; teste size variants
- Input/Textarea/Select: fix do `useId` condicional; teste de `disabled`; teste de `leftElement`/`rightElement`; teste de `placeholder`
- Select: teste de `disabled` por option; helperText

**Normal (completude):**
- Card: `hoverable` prop; `CardDescription`
- Skeleton: variante `text`
- EmptyState: `iconColor`/`iconBgColor` customizados

**Estimativa de esforco total**: ~2 dias de engenharia para chegar a 80% de branches nos 9 componentes.

---

## Top 5 Movimentos

### M1 — Fix Rules of Hooks (Input, Textarea, Select) — BLOCKER
**Criterio de aceite**: `React.useId()` chamado incondicionalmente nas 3 implementacoes; `npm run test` verde em StrictMode; Issue #27 fechada.
**Arquivos**: `src/components/Input/Input.tsx:14`, `src/components/Textarea/Textarea.tsx:14`, `src/components/Select/Select.tsx:20`
**Esforco**: 2h

### M2 — Corrigir falsos negativos Button/Badge e reescrever asserts de variante
**Criterio de aceite**: asserts baseados em comportamento ou snapshot do className real; sem `toContain('text-red-400')` ou `toContain('text-emerald-400')` que nao correspondam ao output CVA; CI verde; Issue #21 fechada.
**Arquivos**: `src/components/Button/Button.test.tsx:33`, `src/components/Badge/Badge.test.tsx:12`
**Esforco**: 3h

### M3 — Adicionar gate de cobertura no vitest.config.ts e step de test no CI
**Criterio de aceite**: `vitest.config.ts` com `thresholds` definidos (80% lines/functions, 75% branches); `.github/workflows/ci.yml` com step `npm run test -- --coverage` executado antes do build do Storybook; PR sem 80% de cobertura falha o check.
**Arquivos**: `vitest.config.ts`, `.github/workflows/ci.yml`
**Esforco**: 1h

### M4 — Testes de acessibilidade keyboard no Modal (focus trap + Escape)
**Criterio de aceite**: testes cobrindo Tab forward, Shift+Tab backward (wrap nos extremos) e Escape key chamando `onClose`; todos usando `@testing-library/user-event` (nao `fireEvent`); cobertura de branches do Modal >= 80%.
**Arquivos**: `src/components/Modal/Modal.test.tsx`, `src/components/Modal/Modal.tsx`
**Esforco**: 4h

### M5 — Chromatic ou storybook test-runner para visual regression no CI
**Criterio de aceite**: pipeline CI captura snapshots de cada Story em push para main; diff automatico bloqueia PR se pixel-diff > threshold configurado; sem necessidade de revisao manual para mudancas de estilo nao intencionais.
**Arquivos**: `.github/workflows/ci.yml`, `.storybook/main.ts`, `package.json`
**Esforco**: 1 dia (setup + baseline de snapshots)
