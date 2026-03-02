import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do campo',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder do input',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do campo',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro (borda vermelha + aria-invalid)',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o campo',
      table: { defaultValue: { summary: 'false' } },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel'],
      description: 'Tipo do input HTML',
    },
  },
  args: {
    placeholder: 'Digite algo...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'voce@exemplo.com',
    type: 'email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    helperText: 'Use letras maiúsculas, minúsculas e números',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'nao-e-um-email',
    error: 'Por favor, insira um email válido',
  },
}

export const WithLeftElement: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar livros...',
    leftElement: <span className="text-sm">🔍</span>,
  },
}

export const WithRightElement: Story = {
  args: {
    label: 'Data',
    placeholder: 'DD/MM/AAAA',
    rightElement: <span className="text-sm">📅</span>,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    defaultValue: 'Valor somente leitura',
    disabled: true,
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-80">
      <Input label="Default" placeholder="Padrão" />
      <Input label="Com helper" placeholder="Email" helperText="Usaremos apenas para notificações" type="email" />
      <Input label="Com erro" defaultValue="valor-invalido" error="Este campo é obrigatório" />
      <Input label="Com ícone esquerdo" placeholder="Buscar..." leftElement={<span>🔍</span>} />
      <Input label="Com ícone direito" placeholder="DD/MM/AAAA" rightElement={<span>📅</span>} />
      <Input label="Desabilitado" defaultValue="Somente leitura" disabled />
    </div>
  ),
}
