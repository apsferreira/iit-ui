import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Text, View } from 'react-native'
import { Modal } from './Modal.native'
import { Button } from '../Button/Button.native'
import { Input } from '../Input/Input.native'

// ── Wrapper interativo (botão + estado) ───────────────────────────────────────

function ModalWithTrigger({
  triggerLabel = 'Abrir Modal',
  triggerVariant = 'primary' as const,
  ...modalProps
}: Omit<React.ComponentProps<typeof Modal>, 'open' | 'onClose'> & {
  triggerLabel?: string
  triggerVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Button variant={triggerVariant} onPress={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Modal {...modalProps} open={open} onClose={() => setOpen(false)} />
    </View>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Mobile/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hideCloseButton: { control: 'boolean' },
  },
  args: {
    open: true,
    onClose: () => {},
    title: 'Título do Modal',
    description: 'Descrição opcional do modal.',
    size: 'md',
    hideCloseButton: false,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// ── Default — controlado pelo Controls panel ──────────────────────────────────

export const Default: Story = {
  args: {
    children: (
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 14, color: '#4A6070' }}>
          Conteúdo do modal. Adicione formulários, confirmações ou qualquer conteúdo aqui.
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button size="sm">Confirmar</Button>
          <Button size="sm" variant="secondary">Cancelar</Button>
        </View>
      </View>
    ),
  },
}

// ── Stories interativos ───────────────────────────────────────────────────────

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
      <View style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: '#DC2626' }}>⚠️ Todos os dados serão permanentemente removidos.</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="destructive" size="sm">Excluir</Button>
        <Button variant="secondary" size="sm">Cancelar</Button>
      </View>
    </ModalWithTrigger>
  ),
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
      <View style={{ gap: 16 }}>
        <Input label="Nome completo" defaultValue="Antonio Pedro S" />
        <Input label="Email" defaultValue="antonio@institutoitinerante.com.br" />
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          <Button>Salvar</Button>
          <Button variant="secondary">Cancelar</Button>
        </View>
      </View>
    </ModalWithTrigger>
  ),
}

export const Large: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="lg"
      title="Selecionar componentes"
      description="Escolha os componentes para o projeto."
      triggerLabel="Abrir Modal lg"
      triggerVariant="accent"
    >
      <View style={{ gap: 8, marginBottom: 16 }}>
        {['Button', 'Card', 'Input', 'Badge', 'Modal'].map((c) => (
          <View key={c} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D0DDE6' }}>
            <Text style={{ fontSize: 14, color: '#0097D6' }}>☑</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#0D1B26' }}>{c}</Text>
          </View>
        ))}
      </View>
      <Button>Adicionar selecionados</Button>
    </ModalWithTrigger>
  ),
}

export const XLarge: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      size="xl"
      title="Preview do componente"
      description="Visualização completa."
      triggerLabel="Abrir Modal xl"
      triggerVariant="ghost"
    >
      <View style={{ padding: 16, backgroundColor: '#0A0F14', borderRadius: 8 }}>
        <Text style={{ fontSize: 12, color: '#00D6A0', fontFamily: 'monospace' }}>
          {'<Button variant="primary">\n  Clique aqui\n</Button>'}
        </Text>
      </View>
    </ModalWithTrigger>
  ),
}

export const NoCloseButton: Story = {
  args: { open: false, onClose: () => {} },
  render: () => (
    <ModalWithTrigger
      hideCloseButton
      title="Operação em andamento"
      description="Aguarde a conclusão..."
      triggerLabel="Sem botão fechar"
      triggerVariant="secondary"
    >
      <View style={{ alignItems: 'center', padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 24 }}>⏳</Text>
        <Text style={{ fontSize: 14, color: '#4A6070', textAlign: 'center' }}>Processando sua solicitação...</Text>
      </View>
    </ModalWithTrigger>
  ),
}
