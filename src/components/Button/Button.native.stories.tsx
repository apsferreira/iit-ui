import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Button } from './Button.native'

const meta = {
  title: 'Mobile/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
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

export const Primary: Story = { args: { variant: 'primary', children: 'Salvar' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancelar' } }
export const Accent: Story = { args: { variant: 'accent', children: 'Confirmar' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ver mais' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Excluir' } }

export const Small: Story = { args: { size: 'sm', children: 'Pequeno' } }
export const Medium: Story = { args: { size: 'md', children: 'Médio' } }
export const Large: Story = { args: { size: 'lg', children: 'Grande' } }

export const Loading: Story = { args: { isLoading: true, children: 'Salvando...' } }
export const Disabled: Story = { args: { disabled: true, children: 'Indisponível' } }

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button isLoading>Carregando</Button>
      <Button disabled>Desabilitado</Button>
    </View>
  ),
}
