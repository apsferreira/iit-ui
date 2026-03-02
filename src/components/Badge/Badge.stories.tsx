import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'info', 'brand'],
      description: 'Estilo semântico do badge',
      table: { defaultValue: { summary: 'neutral' } },
    },
    dot: {
      control: 'boolean',
      description: 'Exibe ponto indicador colorido',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Texto do badge',
    },
  },
  args: {
    children: 'Badge',
    variant: 'neutral',
    dot: false,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Neutral' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Concluído' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Atenção' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Erro' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'Informação' },
}

export const Brand: Story = {
  args: { variant: 'brand', children: 'IIT' },
}

export const WithDot: Story = {
  args: { variant: 'success', dot: true, children: 'Online' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Sem dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="brand">Brand</Badge>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Com dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" dot>Inativo</Badge>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Atenção</Badge>
          <Badge variant="error" dot>Offline</Badge>
          <Badge variant="info" dot>Sincronizando</Badge>
          <Badge variant="brand" dot>IIT Live</Badge>
        </div>
      </div>
    </div>
  ),
}
