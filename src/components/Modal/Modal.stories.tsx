import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { userEvent, within } from '@storybook/test'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

// Wrapper para controle de estado
function ModalWithTrigger({
  triggerLabel = 'Abrir Modal',
  triggerVariant = 'primary' as const,
  ...modalProps
}: Omit<React.ComponentProps<typeof Modal>, 'open' | 'onClose'> & {
  triggerLabel?: string
  triggerVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant={triggerVariant} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Modal {...modalProps} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controla a visibilidade do modal',
    },
    title: {
      control: 'text',
      description: 'Título do modal',
    },
    description: {
      control: 'text',
      description: 'Subtítulo/descrição do modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Largura máxima do painel',
      table: { defaultValue: { summary: 'md' } },
    },
    hideCloseButton: {
      control: 'boolean',
      description: 'Oculta o botão X de fechamento',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// Default — controla via Controls panel
export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Título do Modal',
    description: 'Descrição opcional do modal.',
    children: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[#4A6070]">
          Conteúdo do modal. Adicione formulários, confirmações ou qualquer conteúdo aqui.
        </p>
        <div className="flex gap-2">
          <Button size="sm">Confirmar</Button>
          <Button size="sm" variant="secondary">Cancelar</Button>
        </div>
      </div>
    ),
  },
}

// Stories com trigger interativo — sem required args pois usam render completo
export const Small: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="sm"
      title="Confirmar exclusão"
      description="Esta ação é irreversível."
      triggerLabel="Abrir Modal sm"
      triggerVariant="destructive"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-red-700">⚠️ Todos os dados serão permanentemente removidos.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive" size="sm">🗑️ Excluir</Button>
        <Button variant="secondary" size="sm">Cancelar</Button>
      </div>
    </ModalWithTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /Abrir Modal sm/i })
    await userEvent.click(trigger)
  },
}

export const Medium: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="md"
      title="Editar perfil"
      description="Atualize suas informações pessoais."
      triggerLabel="Abrir Modal md (default)"
    >
      <div className="flex flex-col gap-4">
        <Input label="Nome completo" defaultValue="Antonio Pedro Santana Ferreira" />
        <Input label="Email" defaultValue="antonio@institutoitinerante.com.br" type="email" />
        <div className="flex gap-2 mt-2">
          <Button>Salvar alterações</Button>
          <Button variant="secondary">Cancelar</Button>
        </div>
      </div>
    </ModalWithTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /Abrir Modal md/i })
    await userEvent.click(trigger)
  },
}

export const Large: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="lg"
      title="Selecionar componentes"
      description="Escolha os componentes para adicionar ao projeto."
      triggerLabel="Abrir Modal lg"
      triggerVariant="accent"
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        {['Button', 'Card', 'Input', 'Badge', 'Select', 'Textarea', 'Modal', 'Skeleton'].map((c) => (
          <label key={c} className="flex items-center gap-2 p-3 rounded-lg border border-[#D0DDE6] hover:border-[#0097D6] cursor-pointer transition-colors">
            <input type="checkbox" className="accent-[#0097D6]" defaultChecked={['Button', 'Input', 'Badge'].includes(c)} />
            <span className="text-sm font-medium text-[#0D1B26]">{c}</span>
          </label>
        ))}
      </div>
      <Button>Adicionar selecionados</Button>
    </ModalWithTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /Abrir Modal lg/i })
    await userEvent.click(trigger)
  },
}

export const XLarge: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="xl"
      title="Preview do componente"
      description="Visualização completa com código fonte."
      triggerLabel="Abrir Modal xl"
      triggerVariant="ghost"
    >
      <div className="flex gap-4">
        <div className="flex-1 rounded-lg bg-[#F5F8FA] border border-[#D0DDE6] p-4 flex items-center justify-center min-h-[200px]">
          <Button>Preview ao vivo</Button>
        </div>
        <div className="flex-1 bg-[#0A0F14] rounded-lg p-4">
          <code className="text-xs text-[#00D6A0] font-mono whitespace-pre-wrap block">
            {'<Button variant="primary">\n  Clique aqui\n</Button>'}
          </code>
        </div>
      </div>
    </ModalWithTrigger>
  ),
}
