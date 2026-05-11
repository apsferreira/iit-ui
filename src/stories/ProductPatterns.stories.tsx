/**
 * ProductPatterns.stories.tsx
 *
 * Stories de composição mostrando como os componentes IIT se combinam
 * em cenários reais de cada produto do ecossistema.
 *
 * Serve como documentação viva de patterns aprovados e referência
 * para novos devs entenderem o estilo de cada produto.
 */

import type { Meta, StoryObj } from '@storybook/react'
import {
  BookOpen,
  CheckSquare,
  Clock,
  Plus,
  Search,
  Star,
  TrendingUp,
  MessageCircle,
  Send,
  BarChart2,
  ChevronRight,
  Check,
  Flame,
} from 'lucide-react'
import { Button } from '../components/Button/Button'
import { Badge } from '../components/Badge/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../components/Card/Card'
import { Input } from '../components/Input/Input'
import { Skeleton } from '../components/Skeleton/Skeleton'
import { EmptyState } from '../components/EmptyState/EmptyState'

// ---- Libri: card de livro em leitura ----

function LibriBookCard() {
  return (
    <div
      className="min-h-screen p-6 font-sans"
      style={{ background: '#f5f3ff' }}
    >
      <div className="max-w-sm mx-auto flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: '#3730a3' }}>
              Minha Biblioteca
            </h1>
            <p className="text-xs" style={{ color: '#6366f1' }}>
              3 livros em leitura
            </p>
          </div>
          <Button
            size="sm"
            style={{ background: '#6366f1', color: '#fff', border: 'none' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </Button>
        </div>

        <Input
          placeholder="Buscar por título ou autor..."
          leftElement={<Search className="w-4 h-4" />}
        />

        {/* Cards de livro */}
        {[
          {
            title: 'O Poder do Hábito',
            author: 'Charles Duhigg',
            progress: 68,
            pages: 408,
            currentPage: 277,
          },
          {
            title: 'Deep Work',
            author: 'Cal Newport',
            progress: 32,
            pages: 296,
            currentPage: 95,
          },
        ].map((book) => (
          <div
            key={book.title}
            className="bg-white border rounded-xl p-4 flex gap-4 shadow-sm"
            style={{ borderColor: '#c7d2fe' }}
          >
            {/* Capa simulada */}
            <div
              className="w-14 h-20 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: '#1e1b4b' }}>
                {book.title}
              </p>
              <p className="text-xs mb-3" style={{ color: '#6b7280' }}>
                {book.author}
              </p>

              {/* Barra de progresso */}
              <div className="w-full h-1.5 rounded-full" style={{ background: '#e0e7ff' }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: `${book.progress}%`, background: '#6366f1' }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-medium" style={{ color: '#6366f1' }}>
                  {book.progress}%
                </span>
                <span className="text-xs" style={{ color: '#9ca3af' }}>
                  {book.currentPage} / {book.pages} pág.
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state integrado */}
        <div className="bg-white border border-dashed rounded-xl" style={{ borderColor: '#c7d2fe' }}>
          <EmptyState
            icon={Star}
            title="Nenhum livro concluído"
            description="Livros que você terminar aparecem aqui."
            iconColor="#6366f1"
            iconBgColor="#eef2ff"
          />
        </div>
      </div>
    </div>
  )
}

// ---- Nitro: painel de tarefas do dia ----

function NitroDashboard() {
  const tasks = [
    { label: 'Revisar PR do auth-service', done: true, tag: 'trabalho' },
    { label: 'Implementar EmptyState stories', done: true, tag: 'iit' },
    { label: 'Gravar screencast Meta App Review', done: false, tag: 'socialmake' },
    { label: 'Ensaiar palestra SDD', done: false, tag: 'pessoal' },
  ]

  return (
    <div
      className="min-h-screen p-6 font-sans"
      style={{ background: '#eff6ff' }}
    >
      <div className="max-w-sm mx-auto flex flex-col gap-4">
        {/* Header com streak */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: '#1d4ed8' }}>
              Hoje
            </h1>
            <p className="text-xs" style={{ color: '#3b82f6' }}>
              Segunda, 11 de maio
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: '#fff7ed', color: '#ea580c' }}
          >
            <Flame className="w-4 h-4" />
            12 dias
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Concluídas', value: '2/4', icon: CheckSquare },
            { label: 'Foco hoje', value: '2h 30m', icon: Clock },
            { label: 'Pontos', value: '340 XP', icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3 text-center border"
              style={{ borderColor: '#bfdbfe' }}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: '#3b82f6' }} />
              <p className="text-sm font-bold" style={{ color: '#1e40af' }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: '#6b7280' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Lista de tarefas */}
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#bfdbfe' }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#eff6ff' }}>
            <span className="text-sm font-semibold" style={{ color: '#1e40af' }}>
              Tarefas do dia
            </span>
            <Button size="sm" variant="ghost">
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>
          {tasks.map((task) => (
            <div
              key={task.label}
              className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: '#eff6ff' }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  borderColor: task.done ? '#3b82f6' : '#bfdbfe',
                  background: task.done ? '#3b82f6' : 'transparent',
                }}
              >
                {task.done && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className="text-sm flex-1"
                style={{
                  color: task.done ? '#9ca3af' : '#1e40af',
                  textDecoration: task.done ? 'line-through' : 'none',
                }}
              >
                {task.label}
              </span>
              <Badge variant={task.done ? 'neutral' : 'info'}>
                {task.tag}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- SocialMake: calendar de posts ----

function SocialMakeCalendar() {
  const posts = [
    { time: '09:00', text: 'Lançamento do Libri v1.2 🚀', network: 'LinkedIn', status: 'scheduled' },
    { time: '12:00', text: 'Dica de produtividade com Nitro', network: 'Instagram', status: 'scheduled' },
    { time: '18:30', text: 'Thread sobre Go e Fiber', network: 'Twitter', status: 'draft' },
  ]

  const networkColors: Record<string, string> = {
    LinkedIn: '#0077b5',
    Instagram: '#e1306c',
    Twitter: '#1da1f2',
  }

  return (
    <div
      className="min-h-screen p-6 font-sans"
      style={{ background: '#f5f3ff' }}
    >
      <div className="max-w-sm mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: '#5b21b6' }}>
              SocialMake
            </h1>
            <p className="text-xs" style={{ color: '#8b5cf6' }}>
              Calendário editorial — Hoje
            </p>
          </div>
          <Button size="sm" style={{ background: '#8b5cf6', color: '#fff', border: 'none' }}>
            <Plus className="w-3.5 h-3.5" />
            Post
          </Button>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.time}
              className="bg-white border rounded-xl p-4 flex gap-3 shadow-sm"
              style={{ borderColor: '#ddd6fe' }}
            >
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <span className="text-xs font-mono font-medium" style={{ color: '#8b5cf6' }}>
                  {post.time}
                </span>
                <div className="flex-1 w-px" style={{ background: '#e9d5ff' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: networkColors[post.network] }}
                  />
                  <span className="text-xs font-medium" style={{ color: networkColors[post.network] }}>
                    {post.network}
                  </span>
                  <Badge variant={post.status === 'scheduled' ? 'info' : 'neutral'}>
                    {post.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: '#1e1b4b' }}>
                  {post.text}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#c4b5fd' }} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="bg-white border rounded-xl p-4"
          style={{ borderColor: '#ddd6fe' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4" style={{ color: '#8b5cf6' }} />
            <span className="text-sm font-semibold" style={{ color: '#5b21b6' }}>
              Desempenho da semana
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Posts', value: '12' },
              { label: 'Alcance', value: '4.2k' },
              { label: 'Engaj.', value: '8.3%' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-base font-bold" style={{ color: '#6d28d9' }}>
                  {value}
                </p>
                <p className="text-xs" style={{ color: '#9ca3af' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- Brio: tela de atendimento WhatsApp ----

function BrioAtendimento() {
  const messages = [
    { from: 'cliente', text: 'Oi! Quero saber sobre os planos do SocialMake', time: '14:22' },
    { from: 'bot', text: 'Olá! Temos 3 planos: Starter (R$97), Pro (R$197) e Business (R$397). Qual seu interesse?', time: '14:22' },
    { from: 'cliente', text: 'Me conta mais sobre o Pro', time: '14:23' },
  ]

  return (
    <div
      className="min-h-screen font-sans flex flex-col"
      style={{ background: '#ecfdf5' }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center gap-3 border-b"
        style={{ background: '#fff', borderColor: '#a7f3d0' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: '#10b981' }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: '#065f46' }}>
            Maria Santos
          </p>
          <p className="text-xs" style={{ color: '#6b7280' }}>
            WhatsApp · +55 71 9xxxx-xxxx
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" dot>
            Online
          </Badge>
          <Badge variant="info">Brio IA</Badge>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'cliente' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm"
              style={{
                background: msg.from === 'cliente' ? '#fff' : '#10b981',
                color: msg.from === 'cliente' ? '#065f46' : '#fff',
                borderRadius: msg.from === 'cliente' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              }}
            >
              <p>{msg.text}</p>
              <p
                className="text-xs mt-1 text-right"
                style={{
                  color: msg.from === 'cliente' ? '#9ca3af' : '#d1fae5',
                }}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input de resposta */}
      <div
        className="p-4 border-t flex gap-2"
        style={{ background: '#fff', borderColor: '#a7f3d0' }}
      >
        <Input placeholder="Responder como Brio IA..." className="flex-1" />
        <Button style={{ background: '#10b981', color: '#fff', border: 'none' }}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// ---- Skeleton loading patterns ----

function SkeletonPatterns() {
  return (
    <div className="p-6 max-w-sm mx-auto flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9FAF' }}>
          Libri — Carregando livros
        </p>
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white border border-[#D0DDE6] rounded-xl p-4 flex gap-4"
            >
              <Skeleton variant="block" width={56} height={80} />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="45%" />
                <Skeleton variant="block" width="100%" height={6} />
                <Skeleton variant="text" width="30%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#8A9FAF' }}>
          Nitro — Carregando tarefas
        </p>
        <div className="bg-white border border-[#D0DDE6] rounded-xl overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 border-b last:border-b-0 border-[#F5F8FA]"
            >
              <Skeleton variant="circle" width={20} height={20} />
              <Skeleton variant="text" width={`${50 + i * 15}%`} />
              <Skeleton variant="block" width={60} height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// -------- Meta / Stories --------

const meta = {
  title: 'Foundation/Product Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Padrões de composição para cada produto IIT. Mostre como os componentes se combinam em telas reais. Use como referência antes de implementar novas features.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LibriLivros: Story = {
  name: 'Libri — Lista de livros',
  render: () => <LibriBookCard />,
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const NitroTarefas: Story = {
  name: 'Nitro — Dashboard do dia',
  render: () => <NitroDashboard />,
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const SocialMakeCalendario: Story = {
  name: 'SocialMake — Calendário editorial',
  render: () => <SocialMakeCalendar />,
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const BrioChat: Story = {
  name: 'Brio — Atendimento WhatsApp',
  render: () => <BrioAtendimento />,
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const LoadingPatterns: Story = {
  name: 'Loading Patterns — Skeletons por produto',
  render: () => <SkeletonPatterns />,
  parameters: {
    backgrounds: { default: 'IIT Surface Subtle' },
  },
}
