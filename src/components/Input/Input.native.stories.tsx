import type { Meta, StoryObj } from '@storybook/react'
import { Text, View } from 'react-native'
import { Input } from './Input.native'

const meta = {
  title: 'Mobile/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 320 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
  },
  args: {
    placeholder: 'Digite aqui...',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Senha',
    placeholder: '••••••••',
    helperText: 'Mínimo 8 caracteres',
    secureTextEntry: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    defaultValue: 'invalido@',
    error: 'Email inválido',
  },
}

export const WithLeftElement: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Pesquisar livros...',
    leftElement: <Text style={{ fontSize: 16 }}>🔍</Text>,
  },
}

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input label="Normal" placeholder="Campo normal" />
      <Input label="Com helper" placeholder="Campo com dica" helperText="Texto auxiliar" />
      <Input label="Com erro" placeholder="Campo com erro" defaultValue="valor" error="Campo obrigatório" />
    </View>
  ),
}
