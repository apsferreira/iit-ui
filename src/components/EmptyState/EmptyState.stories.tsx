import type { Meta, StoryObj } from '@storybook/react'
import {
  BookOpen,
  CheckSquare,
  Bell,
  Search,
  Wifi,
  ShoppingBag,
  MessageCircle,
  Star,
  FolderOpen,
  Users,
  AlertTriangle,
  Lock,
} from 'lucide-react'
import { EmptyState } from './EmptyState'
import { colors } from '../../tokens/colors'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do estado vazio',
    },
    description: {
      control: 'text',
      description: 'Descrição opcional explicando o estado vazio',
    },
    iconColor: {
      control: 'color',
      description: 'Cor do ícone (padrão: var(--product-primary))',
    },
    iconBgColor: {
      control: 'color',
      description: 'Cor de fundo do container do ícone',
    },
  },
  args: {
    icon: BookOpen,
    title: 'Nenhum item encontrado',
    description: 'Adicione seu primeiro item para começar.',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-white border border-[#D0DDE6] rounded-xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

// --- Stories base ---

export const Default: Story = {}

export const SemDescricao: Story = {
  args: {
    icon: FolderOpen,
    title: 'Pasta vazia',
  },
}

export const ComAcao: Story = {
  args: {
    icon: BookOpen,
    title: 'Sua biblioteca está vazia',
    description: 'Comece adicionando seu primeiro livro para monitorar sua leitura.',
    action: {
      label: 'Adicionar livro',
      onClick: () => alert('Adicionar livro'),
    },
  },
}

// --- Por produto IIT ---

export const LibriSemLivros: Story = {
  name: 'Libri — Sem livros',
  args: {
    icon: BookOpen,
    title: 'Sua biblioteca está vazia',
    description: 'Adicione livros escaneando o código de barras ou buscando pelo título.',
    iconColor: '#6366f1',
    iconBgColor: '#eef2ff',
    action: {
      label: 'Adicionar primeiro livro',
      onClick: () => {},
    },
  },
}

export const LibriSemResultados: Story = {
  name: 'Libri — Busca sem resultado',
  args: {
    icon: Search,
    title: 'Nenhum livro encontrado',
    description: 'Tente buscar por outro título, autor ou ISBN.',
    iconColor: '#6366f1',
    iconBgColor: '#eef2ff',
  },
}

export const NitroSemTarefas: Story = {
  name: 'Nitro — Sem tarefas',
  args: {
    icon: CheckSquare,
    title: 'Nenhuma tarefa para hoje',
    description: 'Ótimo! Você está em dia. Adicione novas tarefas para manter o foco.',
    iconColor: '#3b82f6',
    iconBgColor: '#eff6ff',
    action: {
      label: 'Nova tarefa',
      onClick: () => {},
    },
  },
}

export const BrioSemAtendimentos: Story = {
  name: 'Brio — Sem atendimentos',
  args: {
    icon: MessageCircle,
    title: 'Nenhum atendimento ativo',
    description: 'Quando um cliente enviar mensagem, o atendimento aparecerá aqui.',
    iconColor: '#10b981',
    iconBgColor: '#ecfdf5',
  },
}

export const SocialMakeSemPosts: Story = {
  name: 'SocialMake — Sem posts agendados',
  args: {
    icon: Star,
    title: 'Nenhum post agendado',
    description: 'Crie e agende seu primeiro post para começar a automatizar suas redes sociais.',
    iconColor: '#8b5cf6',
    iconBgColor: '#f5f3ff',
    action: {
      label: 'Criar post',
      onClick: () => {},
    },
  },
}

export const EventoSemIngressos: Story = {
  name: 'Catraca Virtual — Sem ingressos',
  args: {
    icon: ShoppingBag,
    title: 'Nenhum ingresso vendido ainda',
    description: 'Compartilhe o link do evento para começar a vender.',
    iconColor: '#f97316',
    iconBgColor: '#fff7ed',
  },
}

// --- Estados de sistema ---

export const SemConexao: Story = {
  name: 'Sistema — Sem conexão',
  args: {
    icon: Wifi,
    title: 'Sem conexão com a internet',
    description: 'Verifique sua conexão e tente novamente.',
    iconColor: '#EF4444',
    iconBgColor: '#FEE2E2',
    action: {
      label: 'Tentar novamente',
      onClick: () => {},
    },
  },
}

export const SemPermissao: Story = {
  name: 'Sistema — Sem permissão',
  args: {
    icon: Lock,
    title: 'Acesso restrito',
    description: 'Você não tem permissão para visualizar este conteúdo. Entre em contato com o administrador.',
    iconColor: '#F59E0B',
    iconBgColor: '#FEF3C7',
  },
}

export const Notificacoes: Story = {
  name: 'Sistema — Sem notificações',
  args: {
    icon: Bell,
    title: 'Tudo em dia',
    description: 'Você não tem novas notificações.',
    iconColor: colors.brand.primary,
    iconBgColor: colors.surface.elevated,
  },
}

export const ErroGenerico: Story = {
  name: 'Sistema — Erro inesperado',
  args: {
    icon: AlertTriangle,
    title: 'Algo deu errado',
    description: 'Não foi possível carregar as informações. Tente novamente em instantes.',
    iconColor: '#EF4444',
    iconBgColor: '#FEE2E2',
    action: {
      label: 'Recarregar',
      onClick: () => {},
    },
  },
}

export const SemUsuarios: Story = {
  name: 'Sistema — Sem usuários',
  args: {
    icon: Users,
    title: 'Nenhum usuário cadastrado',
    description: 'Convide membros para colaborar neste espaço.',
    iconColor: colors.brand.primary,
    iconBgColor: colors.surface.elevated,
    action: {
      label: 'Convidar usuários',
      onClick: () => {},
    },
  },
}

// --- Gallery: todos em grid ---

export const Galeria: Story = {
  name: 'Galeria — Todos os contextos',
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[
        {
          icon: BookOpen,
          title: 'Libri',
          description: 'Nenhum livro adicionado.',
          iconColor: '#6366f1',
          iconBgColor: '#eef2ff',
        },
        {
          icon: CheckSquare,
          title: 'Nitro',
          description: 'Nenhuma tarefa para hoje.',
          iconColor: '#3b82f6',
          iconBgColor: '#eff6ff',
        },
        {
          icon: MessageCircle,
          title: 'Brio',
          description: 'Nenhum atendimento ativo.',
          iconColor: '#10b981',
          iconBgColor: '#ecfdf5',
        },
        {
          icon: Star,
          title: 'SocialMake',
          description: 'Nenhum post agendado.',
          iconColor: '#8b5cf6',
          iconBgColor: '#f5f3ff',
        },
        {
          icon: ShoppingBag,
          title: 'Catraca',
          description: 'Nenhum ingresso vendido.',
          iconColor: '#f97316',
          iconBgColor: '#fff7ed',
        },
        {
          icon: AlertTriangle,
          title: 'Erro',
          description: 'Algo deu errado.',
          iconColor: '#EF4444',
          iconBgColor: '#FEE2E2',
        },
      ].map((props) => (
        <div key={props.title} className="bg-white border border-[#D0DDE6] rounded-xl">
          <EmptyState {...props} />
        </div>
      ))}
    </div>
  ),
}
