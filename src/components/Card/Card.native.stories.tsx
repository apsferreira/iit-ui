import type { Meta, StoryObj } from '@storybook/react'
import { Text, View } from 'react-native'
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './Card.native'
import { Button } from '../Button/Button.native'
import { Badge } from '../Badge/Badge.native'

const meta = {
  title: 'Mobile/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição opcional do conteúdo.</CardDescription>
      </CardHeader>
      <CardBody>
        <Text style={{ fontSize: 14, color: '#4A5568' }}>Conteúdo do card aqui.</Text>
      </CardBody>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Empréstimo Ativo</CardTitle>
        <CardDescription>Vence em 15 dias</CardDescription>
      </CardHeader>
      <CardBody>
        <Badge variant="warning" dot>Pendente devolução</Badge>
      </CardBody>
      <CardFooter style={{ justifyContent: 'flex-end', gap: 8 }}>
        <Button variant="ghost" size="sm">Renovar</Button>
        <Button size="sm">Ver detalhes</Button>
      </CardFooter>
    </Card>
  ),
}

export const BookCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>O Senhor dos Anéis</CardTitle>
        <CardDescription>J.R.R. Tolkien · 1954</CardDescription>
      </CardHeader>
      <CardBody>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Badge variant="success">Disponível</Badge>
          <Badge variant="info">Ficção</Badge>
        </View>
      </CardBody>
      <CardFooter>
        <Button variant="accent" size="sm">Reservar</Button>
      </CardFooter>
    </Card>
  ),
}
