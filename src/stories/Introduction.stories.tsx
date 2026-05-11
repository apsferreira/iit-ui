/**
 * Introduction.stories.tsx
 *
 * Página de boas-vindas do IIT Design System.
 * Aparece primeiro na sidebar do Storybook.
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/Badge/Badge'

const PRODUCTS = [
  { name: 'Libri', description: 'Biblioteca pessoal + leitura', color: '#6366f1', bg: '#eef2ff' },
  { name: 'Nitro', description: 'Produtividade e foco', color: '#3b82f6', bg: '#eff6ff' },
  { name: 'SocialMake', description: 'Automação redes sociais', color: '#8b5cf6', bg: '#f5f3ff' },
  { name: 'Brio', description: 'Atendimento WhatsApp IA', color: '#10b981', bg: '#ecfdf5' },
  { name: 'Catraca', description: 'Gestão de eventos', color: '#f97316', bg: '#fff7ed' },
  { name: 'Jiu-Jitsu', description: 'Academia e graduações', color: '#dc2626', bg: '#fef2f2' },
]

const COMPONENTS = [
  { name: 'Button', variants: '5 variantes + 3 tamanhos + estados', status: 'stable' },
  { name: 'Badge', variants: '6 variantes + dot mode', status: 'stable' },
  { name: 'Card', variants: 'Header / Body / Footer composable', status: 'stable' },
  { name: 'Input', variants: 'Label / helper / error / ícones', status: 'stable' },
  { name: 'Textarea', variants: 'Counter + maxLength', status: 'stable' },
  { name: 'Select', variants: 'Label / helper / error / many options', status: 'stable' },
  { name: 'Modal', variants: '4 tamanhos + play interactions', status: 'stable' },
  { name: 'Skeleton', variants: 'block / text / circle + patterns', status: 'stable' },
  { name: 'EmptyState', variants: 'Icon + action + product contexts', status: 'stable' },
  { name: 'Toast', variants: '—', status: 'planned' },
  { name: 'Tooltip', variants: '—', status: 'planned' },
  { name: 'Tabs', variants: '—', status: 'planned' },
  { name: 'Avatar', variants: '—', status: 'planned' },
  { name: 'ProgressBar', variants: '—', status: 'planned' },
]

function IntroductionPage() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#F5F8FA', color: '#0D1B26' }}>
      {/* Hero */}
      <div
        className="px-10 py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #0097D6 0%, #006FA3 60%, #004F80 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              v0.1.0
            </div>
            <Badge variant="success">Estável</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            IIT Design System
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Biblioteca de componentes React compartilhada entre todos os produtos do ecossistema{' '}
            <strong>Instituto Itinerante</strong>. Mobile-first, acessível (WCAG 2.1 AA) e com
            suporte a dark mode.
          </p>
          <div className="flex flex-wrap gap-3">
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              React 18+
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              TypeScript
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              TailwindCSS
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              Expo / React Native
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              Storybook 8
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 py-12 max-w-4xl mx-auto">

        {/* Princípios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Princípios de Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Mobile-First',
                desc: 'Todo componente é projetado para 375px e evolui para desktop.',
                icon: '📱',
              },
              {
                title: 'Acessível',
                desc: 'Contraste mínimo 4.5:1. WCAG 2.1 AA é o piso, não o teto.',
                icon: '♿',
              },
              {
                title: 'Consistente',
                desc: 'Tokens compartilhados garantem coerência entre todos os produtos.',
                icon: '🎨',
              },
              {
                title: 'Composable',
                desc: 'Componentes pequenos e combináveis. Card + Badge + Button = tela real.',
                icon: '🧩',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white border border-[#D0DDE6] rounded-xl p-5"
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                <p className="text-xs" style={{ color: '#4A6070' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Produtos */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">Produtos do Ecossistema</h2>
          <p className="text-sm mb-6" style={{ color: '#4A6070' }}>
            Cada produto tem sua cor primária. Os componentes IIT respeitam a variável{' '}
            <code className="font-mono text-xs bg-[#EBF4FB] px-1.5 py-0.5 rounded">
              --product-primary
            </code>{' '}
            para adaptação automática ao contexto de cada app.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-[#D0DDE6] rounded-xl p-4 flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ background: p.bg }}
                >
                  <div className="w-full h-full rounded-lg flex items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ background: p.color }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs" style={{ color: '#8A9FAF' }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Componentes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">Catálogo de Componentes</h2>
          <p className="text-sm mb-6" style={{ color: '#4A6070' }}>
            9 componentes estáveis. Use a sidebar para navegar até cada um e explorar variantes,
            estados e interações.
          </p>
          <div className="bg-white border border-[#D0DDE6] rounded-xl overflow-hidden">
            {COMPONENTS.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0"
                style={{ borderColor: '#F5F8FA' }}
              >
                <div>
                  <span className="text-sm font-semibold">{c.name}</span>
                  {c.variants !== '—' && (
                    <span className="ml-2 text-xs" style={{ color: '#8A9FAF' }}>
                      {c.variants}
                    </span>
                  )}
                </div>
                <Badge variant={c.status === 'stable' ? 'success' : 'neutral'}>
                  {c.status === 'stable' ? 'Estável' : 'Planejado'}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Instalação */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Instalação</h2>
          <div className="bg-[#0A0F14] rounded-xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9FAF' }}>
              package.json — via GitHub Packages
            </p>
            <code className="text-sm font-mono block whitespace-pre" style={{ color: '#00D6A0' }}>
              {`// .npmrc
@iit:registry=https://npm.pkg.github.com

// package.json
"@iit/ui": "^0.1.0"`}
            </code>
          </div>

          <div className="bg-[#0A0F14] rounded-xl p-6 mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9FAF' }}>
              Uso básico
            </p>
            <code className="text-sm font-mono block whitespace-pre" style={{ color: '#33ADE0' }}>
              {`import { Button, Badge, Card } from '@iit/ui'
import '@iit/ui/dist/index.css' // se necessário

<Button variant="primary">Salvar</Button>
<Badge variant="success" dot>Online</Badge>`}
            </code>
          </div>

          <div className="bg-[#0A0F14] rounded-xl p-6 mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9FAF' }}>
              tailwind.config.ts — extender tokens
            </p>
            <code className="text-sm font-mono block whitespace-pre" style={{ color: '#A5B4FC' }}>
              {`import iitConfig from '@iit/ui/tailwind'

export default {
  presets: [iitConfig],
  content: ['./src/**/*.{ts,tsx}'],
}`}
            </code>
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-xl font-bold mb-4">Links úteis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: 'Repositório',
                desc: 'Código-fonte no GitHub',
                url: 'https://github.com/apsferreira/iit-ui',
                color: '#0097D6',
              },
              {
                title: 'Design Tokens',
                desc: 'Referência visual de cores e tipografia',
                url: '#',
                color: '#8b5cf6',
              },
              {
                title: 'Product Patterns',
                desc: 'Composições por produto real',
                url: '#',
                color: '#10b981',
              },
            ].map((link) => (
              <a
                key={link.title}
                href={link.url}
                className="bg-white border border-[#D0DDE6] rounded-xl p-4 block hover:border-[#0097D6] transition-colors group"
              >
                <p className="font-semibold text-sm mb-1 group-hover:text-[#0097D6] transition-colors">
                  {link.title}
                </p>
                <p className="text-xs" style={{ color: '#8A9FAF' }}>
                  {link.desc}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const meta = {
  title: 'Foundation/Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Documentação de boas-vindas do IIT Design System.',
      },
    },
  },
} satisfies Meta<typeof IntroductionPage>

export default meta
type Story = StoryObj<typeof meta>

export const BemVindo: Story = {
  name: 'Bem-vindo ao IIT Design System',
}
