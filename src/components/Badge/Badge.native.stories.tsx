import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Badge } from './Badge.native'

const meta = {
  title: 'Mobile/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'info', 'brand'],
    },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'neutral',
    dot: false,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Neutral: Story = { args: { variant: 'neutral', children: 'Neutro' } }
export const Success: Story = { args: { variant: 'success', children: 'Ativo' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pendente' } }
export const Error: Story = { args: { variant: 'error', children: 'Erro' } }
export const Info: Story = { args: { variant: 'info', children: 'Info' } }
export const Brand: Story = { args: { variant: 'brand', children: 'IIT' } }

export const WithDot: Story = { args: { variant: 'success', dot: true, children: 'Online' } }

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      <Badge variant="neutral">Neutro</Badge>
      <Badge variant="success" dot>Ativo</Badge>
      <Badge variant="warning" dot>Pendente</Badge>
      <Badge variant="error" dot>Erro</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="brand">IIT</Badge>
    </View>
  ),
}
