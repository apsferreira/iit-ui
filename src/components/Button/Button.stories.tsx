import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'accent'],
      description: 'Estilo visual do botão',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'md' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Exibe spinner e desabilita o botão',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Primary: Story = {
  args: { variant: 'primary', children: 'Salvar' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancelar' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ver mais' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Excluir' },
}

export const Accent: Story = {
  args: { variant: 'accent', children: 'Confirmar' },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Pequeno' },
}

export const Medium: Story = {
  args: { size: 'md', children: 'Médio' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Grande' },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Salvar arquivo',
    leftIcon: <span>💾</span>,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Próximo',
    variant: 'ghost',
    rightIcon: <span>→</span>,
  },
}

export const Loading: Story = {
  args: { isLoading: true, children: 'Salvando...' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Indisponível' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Variantes</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Tamanhos</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Com Ícones</p>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<span>💾</span>}>Salvar</Button>
          <Button rightIcon={<span>→</span>} variant="ghost">Próximo</Button>
          <Button leftIcon={<span>✅</span>} variant="accent">Aprovar</Button>
          <Button leftIcon={<span>🗑️</span>} variant="destructive">Excluir</Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#8A9FAF] uppercase tracking-widest mb-3">Estados</p>
        <div className="flex flex-wrap gap-3">
          <Button isLoading>Carregando</Button>
          <Button disabled>Desabilitado</Button>
          <Button disabled variant="secondary">Desabilitado</Button>
        </div>
      </div>
    </div>
  ),
}
