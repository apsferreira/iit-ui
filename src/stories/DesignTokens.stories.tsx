import type { Meta, StoryObj } from '@storybook/react'
import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'

// -------- helpers de renderização --------

function ColorSwatch({
  name,
  value,
  textColor = '#0D1B26',
}: {
  name: string
  value: string
  textColor?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="w-full h-14 rounded-lg border border-black/10"
        style={{ backgroundColor: value }}
      />
      <p className="text-xs font-medium" style={{ color: textColor }}>
        {name}
      </p>
      <p className="text-xs font-mono" style={{ color: textColor === '#0D1B26' ? '#4A6070' : '#8A9FAF' }}>
        {value}
      </p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: '#8A9FAF' }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function SwatchGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">{children}</div>
}

// -------- componente principal --------

function DesignTokensPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans" style={{ color: '#0D1B26' }}>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Design Tokens</h1>
        <p style={{ color: '#4A6070' }} className="text-sm max-w-xl">
          Tokens de design do IIT Design System. Use os valores abaixo via CSS custom properties,
          classes Tailwind prefixadas com{' '}
          <code className="font-mono text-xs bg-[#F5F8FA] px-1 rounded">iit-</code>, ou
          importando diretamente de{' '}
          <code className="font-mono text-xs bg-[#F5F8FA] px-1 rounded">@iit/ui/tokens</code>.
        </p>
      </div>

      {/* BRAND */}
      <Section title="Cores da Marca — Brand">
        <SwatchGrid>
          <ColorSwatch name="brand.primary" value={colors.brand.primary} />
          <ColorSwatch name="brand.primaryLight" value={colors.brand.primaryLight} />
          <ColorSwatch name="brand.primaryDark" value={colors.brand.primaryDark} />
          <ColorSwatch name="brand.secondary" value={colors.brand.secondary} />
          <ColorSwatch name="brand.secondaryLight" value={colors.brand.secondaryLight} />
          <ColorSwatch name="brand.secondaryDark" value={colors.brand.secondaryDark} />
        </SwatchGrid>
      </Section>

      {/* PRODUTOS */}
      <Section title="Cores por Produto">
        <SwatchGrid>
          <ColorSwatch name="Libri primary" value="#6366f1" />
          <ColorSwatch name="Libri dark" value="#4f46e5" />
          <ColorSwatch name="Libri light" value="#a5b4fc" />
          <ColorSwatch name="Nitro primary" value="#3b82f6" />
          <ColorSwatch name="Nitro dark" value="#2563eb" />
          <ColorSwatch name="Nitro light" value="#93c5fd" />
        </SwatchGrid>
        <div className="mt-4">
          <SwatchGrid>
            <ColorSwatch name="SocialMake" value="#8b5cf6" />
            <ColorSwatch name="SocialMake dark" value="#7c3aed" />
            <ColorSwatch name="Brio primary" value="#10b981" />
            <ColorSwatch name="Brio dark" value="#059669" />
            <ColorSwatch name="Food primary" value="#f97316" />
            <ColorSwatch name="JJ primary" value="#dc2626" />
          </SwatchGrid>
        </div>
      </Section>

      {/* SURFACE */}
      <Section title="Superfícies — Light">
        <SwatchGrid>
          <ColorSwatch name="surface.base" value={colors.surface.base} />
          <ColorSwatch name="surface.subtle" value={colors.surface.subtle} />
          <ColorSwatch name="surface.elevated" value={colors.surface.elevated} />
        </SwatchGrid>
      </Section>

      <Section title="Superfícies — Dark">
        <SwatchGrid>
          <ColorSwatch name="surfaceDark.base" value={colors.surfaceDark.base} textColor="#F5F8FA" />
          <ColorSwatch name="surfaceDark.subtle" value={colors.surfaceDark.subtle} textColor="#F5F8FA" />
          <ColorSwatch name="surfaceDark.elevated" value={colors.surfaceDark.elevated} textColor="#F5F8FA" />
        </SwatchGrid>
      </Section>

      {/* TEXT */}
      <Section title="Texto">
        <SwatchGrid>
          <ColorSwatch name="text.primary" value={colors.text.primary} />
          <ColorSwatch name="text.secondary" value={colors.text.secondary} />
          <ColorSwatch name="text.muted" value={colors.text.muted} />
          <ColorSwatch name="text.onBrand" value={colors.text.onBrand} />
        </SwatchGrid>
      </Section>

      {/* BORDER */}
      <Section title="Bordas">
        <SwatchGrid>
          <ColorSwatch name="border.default" value={colors.border.default} />
          <ColorSwatch name="border.subtle" value={colors.border.subtle} />
          <ColorSwatch name="border.brand" value={colors.border.brand} />
        </SwatchGrid>
      </Section>

      {/* STATUS */}
      <Section title="Status Semântico">
        <SwatchGrid>
          <ColorSwatch name="status.success" value={colors.status.success} />
          <ColorSwatch name="status.successBg" value={colors.status.successBg} />
          <ColorSwatch name="status.warning" value={colors.status.warning} />
          <ColorSwatch name="status.warningBg" value={colors.status.warningBg} />
          <ColorSwatch name="status.error" value={colors.status.error} />
          <ColorSwatch name="status.errorBg" value={colors.status.errorBg} />
        </SwatchGrid>
      </Section>

      {/* TIPOGRAFIA */}
      <Section title="Tipografia — Escala de tamanhos">
        <div className="flex flex-col gap-3">
          {(Object.entries(typography.fontSize) as [string, string][]).map(([key, value]) => (
            <div key={key} className="flex items-baseline gap-4">
              <span className="w-10 text-xs font-mono" style={{ color: '#8A9FAF' }}>
                {key}
              </span>
              <span className="w-16 text-xs font-mono" style={{ color: '#4A6070' }}>
                {value}
              </span>
              <span style={{ fontSize: value, color: '#0D1B26', lineHeight: '1.3' }}>
                Instituto Itinerante
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografia — Pesos">
        <div className="flex flex-col gap-3">
          {(Object.entries(typography.fontWeight) as [string, string][]).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-20 text-xs font-mono" style={{ color: '#8A9FAF' }}>
                {key} ({value})
              </span>
              <span
                style={{
                  fontWeight: parseInt(value),
                  fontSize: '1.125rem',
                  color: '#0D1B26',
                }}
              >
                Instituto Itinerante
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ESPAÇAMENTO */}
      <Section title="Espaçamento — Base 4px (Tailwind padrão)">
        <div className="flex flex-wrap gap-y-4 gap-x-6">
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((step) => (
            <div key={step} className="flex flex-col items-center gap-1">
              <div
                className="bg-[#0097D6] rounded"
                style={{ width: `${step * 4}px`, height: '16px' }}
              />
              <span className="text-xs font-mono" style={{ color: '#8A9FAF' }}>
                {step} ({step * 4}px)
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* BORDER RADIUS */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {[
            { name: 'iit-sm (6px)', value: '6px' },
            { name: 'iit (8px)', value: '8px' },
            { name: 'iit-lg (12px)', value: '12px' },
            { name: 'xl (12px)', value: '12px' },
            { name: '2xl (16px)', value: '16px' },
            { name: 'full (9999px)', value: '9999px' },
          ].map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-[#EBF4FB] border-2 border-[#0097D6]"
                style={{ borderRadius: value }}
              />
              <span className="text-xs font-mono text-center" style={{ color: '#4A6070' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// -------- meta / story --------

const meta = {
  title: 'Foundation/Design Tokens',
  component: DesignTokensPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Referência visual completa de todos os tokens de design do IIT Design System. Cores, tipografia, espaçamento e border-radius.',
      },
    },
  },
} satisfies Meta<typeof DesignTokensPage>

export default meta
type Story = StoryObj<typeof meta>

export const Referencia: Story = {
  name: 'Referencia Visual',
}
