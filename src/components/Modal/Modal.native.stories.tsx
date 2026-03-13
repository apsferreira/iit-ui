import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Text, View } from 'react-native'
import { Modal } from './Modal.native'
import { Button } from '../Button/Button.native'

const meta = {
  title: 'Mobile/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 375, height: 500 }}>
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
    title: 'Confirmação',
    description: 'Tem certeza que deseja continuar?',
    size: 'md',
    hideCloseButton: false,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <View>
        <Button onPress={() => setOpen(true)}>Abrir Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar devolução"
          description="Deseja confirmar a devolução do livro?"
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: '#4A5568' }}>
              O livro "O Senhor dos Anéis" será marcado como devolvido.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="sm" onPress={() => setOpen(false)}>Cancelar</Button>
              <Button size="sm" onPress={() => setOpen(false)}>Confirmar</Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  },
}

export const Small: Story = { args: { size: 'sm', title: 'Alerta' } }
export const Large: Story = { args: { size: 'lg', title: 'Detalhes completos' } }
export const NoCloseButton: Story = { args: { hideCloseButton: true, title: 'Operação em andamento' } }
