import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do campo',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder do textarea',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    showCount: {
      control: 'boolean',
      description: 'Exibe contador de caracteres',
      table: { defaultValue: { summary: 'false' } },
    },
    maxLength: {
      control: 'number',
      description: 'Limite máximo de caracteres',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o campo',
      table: { defaultValue: { summary: 'false' } },
    },
    rows: {
      control: 'number',
      description: 'Número de linhas visíveis',
    },
  },
  args: {
    placeholder: 'Digite aqui...',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Observações',
    placeholder: 'Descreva suas observações...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Mensagem',
    error: 'Campo obrigatório — mínimo 10 caracteres',
    defaultValue: 'curto',
  },
}

export const WithCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Fale sobre você...',
    showCount: true,
    defaultValue: 'Desenvolvedor no Instituto Itinerante.',
  },
}

export const MaxLength: Story = {
  args: {
    label: 'Tweet',
    placeholder: 'O que você está pensando?',
    showCount: true,
    maxLength: 280,
    helperText: 'Máximo de 280 caracteres',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Notas (somente leitura)',
    defaultValue: 'Este campo não pode ser editado.',
    disabled: true,
  },
}
