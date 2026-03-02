import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const estadosBrasil = [
  { value: 'BA', label: 'Bahia' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'PR', label: 'Paraná' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'CE', label: 'Ceará' },
  { value: 'GO', label: 'Goiás' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do select',
    },
    placeholder: {
      control: 'text',
      description: 'Opção inicial desabilitada (placeholder)',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o select',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Selecione um framework...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Categoria',
    placeholder: 'Selecione...',
    error: 'Selecione uma categoria',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Plano (desabilitado)',
    options: [
      { value: 'free', label: 'Gratuito' },
      { value: 'pro', label: 'Pro' },
    ],
    disabled: true,
  },
}

export const WithManyOptions: Story = {
  args: {
    label: 'Estado',
    placeholder: 'Selecione um estado...',
    options: estadosBrasil,
    helperText: 'Selecione o estado de residência',
  },
}
