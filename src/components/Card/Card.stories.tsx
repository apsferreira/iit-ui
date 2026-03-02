import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
      description: 'Adiciona efeito visual no hover (borda + fundo)',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    hoverable: false,
  },
  decorators: [
    (Story) => (
      <div className="p-4 min-w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Conteúdo do card sem estrutura definida.</p>
      </CardBody>
    </Card>
  ),
}

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Corpo com conteúdo relevante.</p>
      </CardBody>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">Conteúdo do card com rodapé.</p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="secondary">Cancelar</Button>
        <Button size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAllSubcomponents: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Projeto Focus Hub</CardTitle>
            <CardDescription>Sistema de produtividade GTD</CardDescription>
          </div>
          <Badge variant="success" dot>Ativo</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-[#A1A1B5] text-sm">
          Fase 1 completa com 35 endpoints REST, habit tracking e gamificação.
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="info">React 18</Badge>
          <Badge variant="brand">Go</Badge>
          <Badge variant="neutral">PostgreSQL</Badge>
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="ghost">Ver detalhes</Button>
        <Button size="sm">Acessar</Button>
      </CardFooter>
    </Card>
  ),
}

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[#8A9FAF]">Passe o mouse sobre o card</p>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card Hoverable</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-[#A1A1B5] text-sm">Efeito de hover com transição suave na borda e fundo.</p>
        </CardBody>
      </Card>
    </div>
  ),
}

export const Simple: Story = {
  render: (args) => (
    <Card {...args} className="p-6">
      <p className="text-[#F4F4F8] font-medium">Card simples</p>
      <p className="text-[#A1A1B5] text-sm mt-1">Sem subcomponentes, apenas className com padding.</p>
    </Card>
  ),
}
