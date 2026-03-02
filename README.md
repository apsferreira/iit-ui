# @iit/ui — IIT Design System

Biblioteca de componentes compartilhada para todos os frontends do **Instituto Itinerante**.

Light mode first. Tailwind-powered. TypeScript-first. Identidade visual oficial IIT.

---

## Instalação

### 1. Adicionar o pacote via pnpm workspace

No `pnpm-workspace.yaml` da raiz do monorepo (ou criar um):

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

No `package.json` do seu app:

```json
{
  "dependencies": {
    "@iit/ui": "workspace:*"
  }
}
```

Depois:
```bash
pnpm install
```

### 2. Importar as fontes

Adicione ao seu CSS global (ex: `globals.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

Ou via `<link>` no `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### 3. Configurar Tailwind no app consumidor

No `tailwind.config.ts` do seu app:

```ts
import type { Config } from 'tailwindcss'
import iitConfig from '@iit/ui/tailwind'

const config: Config = {
  presets: [iitConfig],
  content: [
    './src/**/*.{ts,tsx}',
    // Incluir os componentes do design system para purge correto:
    './node_modules/@iit/ui/src/**/*.{ts,tsx}',
  ],
}

export default config
```

---

## Logos

As logos do IIT estão disponíveis em `/home/node/.openclaw/design-assets/`.

**Uso recomendado:**
- **Logo branca** → fundos escuros (ex: `surfaceDark.base`, `brand.primary`)
- **Logo azul** → fundos claros (ex: `surface.base`, `surface.subtle`, `surface.elevated`)

---

## Uso dos Componentes

```tsx
import { Button, Card, CardHeader, CardTitle, CardBody, Input, Badge, Modal } from '@iit/ui'

// Button
<Button variant="primary" size="md">Salvar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="accent">Destaque</Button>
<Button variant="ghost" size="sm">Ver mais</Button>
<Button variant="destructive" isLoading>Deletar</Button>

// Card
<Card hoverable>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardBody>
    Conteúdo aqui
  </CardBody>
</Card>

// Input
<Input
  label="Email"
  placeholder="seu@email.com"
  helperText="Nunca compartilhamos seu email"
  error="Email inválido" // ativa o estado de erro
/>

// Badge
<Badge variant="success" dot>Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Falhou</Badge>
<Badge variant="info">Novo</Badge>
<Badge variant="brand">IIT</Badge>

// Select
<Select
  label="Categoria"
  options={[
    { value: 'tech', label: 'Tecnologia' },
    { value: 'design', label: 'Design' },
  ]}
  error="Selecione uma categoria"
/>

// Textarea
<Textarea
  label="Descrição"
  showCount
  maxLength={280}
  helperText="Máximo 280 caracteres"
/>

// Modal
const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar ação"
  description="Essa ação não pode ser desfeita."
  size="md"
>
  <div className="flex gap-3 justify-end">
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive">Confirmar</Button>
  </div>
</Modal>

// Skeleton
<Skeleton variant="block" height={120} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="circle" width={40} height={40} />
```

---

## Design Tokens

```ts
import { colors, typography } from '@iit/ui'

// Usar em CSS-in-JS ou inline styles
const myStyle = {
  color: colors.text.primary,
  background: colors.surface.elevated,
}
```

### Paleta de Cores Oficial IIT

#### Brand
| Token | Valor | Uso |
|-------|-------|-----|
| `brand.primary` | `#0097D6` | IIT Blue — ações primárias, CTA principal |
| `brand.primaryLight` | `#33ADE0` | Hover em light mode |
| `brand.primaryDark` | `#006FA3` | Hover em dark mode |
| `brand.secondary` | `#00D6A0` | Teal — CTAs secundários, destaques |
| `brand.secondaryLight` | `#33DEB3` | Hover teal em light mode |
| `brand.secondaryDark` | `#00A87E` | Hover teal em dark mode |

#### Superfícies (Light Mode)
| Token | Valor | Uso |
|-------|-------|-----|
| `surface.base` | `#FFFFFF` | Background da página |
| `surface.subtle` | `#F5F8FA` | Fundos alternativos, sidebars |
| `surface.elevated` | `#EBF4FB` | Cards, painéis, inputs |

#### Superfícies (Dark Mode)
| Token | Valor | Uso |
|-------|-------|-----|
| `surfaceDark.base` | `#0A0F14` | Background da página |
| `surfaceDark.subtle` | `#111820` | Fundos alternativos |
| `surfaceDark.elevated` | `#1A2530` | Cards, painéis |

#### Texto
| Token | Valor | Uso |
|-------|-------|-----|
| `text.primary` | `#0D1B26` | Texto principal |
| `text.secondary` | `#4A6070` | Texto secundário |
| `text.muted` | `#8A9FAF` | Labels, placeholders |
| `text.onBrand` | `#FFFFFF` | Texto sobre brand.primary |

#### Bordas
| Token | Valor | Uso |
|-------|-------|-----|
| `border.default` | `#D0DDE6` | Bordas padrão |
| `border.subtle` | `#EBF2F7` | Bordas sutis |
| `border.brand` | `#0097D6` | Bordas de foco / destaque |

#### Status
| Token | Valor | Uso |
|-------|-------|-----|
| `status.success` | `#00D6A0` | Sucesso (= brand.secondary) |
| `status.successBg` | `#E6FAF5` | Fundo de sucesso |
| `status.warning` | `#F59E0B` | Alertas |
| `status.warningBg` | `#FEF3C7` | Fundo de alerta |
| `status.error` | `#EF4444` | Erros |
| `status.errorBg` | `#FEE2E2` | Fundo de erro |
| `status.info` | `#0097D6` | Informações (= brand.primary) |
| `status.infoBg` | `#EBF4FB` | Fundo de info |

### Tipografia

| Token | Valor |
|-------|-------|
| `fontFamily.sans` | `Inter`, system-ui, sans-serif |
| `fontFamily.mono` | `JetBrains Mono`, Fira Code, monospace |

---

## Componentes

| Componente | Variantes | Notas |
|-----------|-----------|-------|
| `Button` | `primary`, `secondary`, `accent`, `ghost`, `destructive` | Sizes: `sm`, `md`, `lg`. Suporta `isLoading`, `leftIcon`, `rightIcon` |
| `Card` | — | Subcomponentes: `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`, `CardFooter`. Prop `hoverable` |
| `Input` | — | Suporta `label`, `error`, `helperText`, `leftElement`, `rightElement` |
| `Badge` | `neutral`, `success`, `warning`, `error`, `info`, `brand` | Prop `dot` para indicador visual |
| `Select` | — | Suporta `options[]`, `label`, `error`, `placeholder` |
| `Textarea` | — | Suporta `label`, `error`, `showCount`, `maxLength` |
| `Modal` | — | Sizes: `sm`, `md`, `lg`, `xl`. Focus trap automático, fecha com Esc |
| `Skeleton` | `block`, `text`, `circle` | Props `width` e `height` |

---

## Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev

# Testes
pnpm test

# Testes em watch
pnpm test:watch
```

---

## Decisões de Design

- **Light mode first**: sistema projetado com fundos claros como padrão, com suporte a dark mode via tokens `surfaceDark`.
- **IIT Blue como brand primary**: `#0097D6` é a cor oficial do Instituto Itinerante. Transmite confiança, tecnologia e acessibilidade.
- **Teal como secondary**: `#00D6A0` complementa o azul com energia e modernidade para CTAs secundários.
- **CVA para variantes**: `class-variance-authority` garante type-safety nas props de variante e elimina if/else de classes.
- **Focus rings consistentes**: todos os elementos interativos usam `ring-[#0097D6]` para acessibilidade uniforme.
- **`cn()` utility**: combina `clsx` + `tailwind-merge` para evitar conflitos de classes ao compor componentes.

---

*IIT Design System — Instituto Itinerante © 2026*
