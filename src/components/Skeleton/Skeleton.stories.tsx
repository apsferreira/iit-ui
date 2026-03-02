import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['block', 'text', 'circle'],
      description: 'Formato do skeleton',
      table: { defaultValue: { summary: 'block' } },
    },
    width: {
      control: 'text',
      description: 'Largura (número = px, string = qualquer unidade CSS)',
    },
    height: {
      control: 'text',
      description: 'Altura (número = px, string = qualquer unidade CSS)',
    },
  },
  args: {
    variant: 'block',
    width: 200,
    height: 80,
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Block: Story = {
  args: { variant: 'block', width: 240, height: 120 },
}

export const Text: Story = {
  args: { variant: 'text', width: '80%' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const Circle: Story = {
  args: { variant: 'circle', width: 64, height: 64 },
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 bg-white border border-[#D0DDE6] rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="block" width="100%" height={140} />
      <div className="flex flex-col gap-1.5">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="block" width={80} height={32} />
        <Skeleton variant="block" width={100} height={32} />
      </div>
    </div>
  ),
}

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 flex flex-col gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-[#D0DDE6] rounded-lg p-4 flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton variant="text" width={`${50 + i * 10}%`} />
            <Skeleton variant="text" width={`${30 + i * 8}%`} />
          </div>
          <Skeleton variant="block" width={60} height={24} />
        </div>
      ))}
    </div>
  ),
}
