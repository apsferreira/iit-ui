import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookOpen, Inbox } from 'lucide-react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renderiza título e ícone', () => {
    render(<EmptyState icon={BookOpen} title="Nenhum livro ainda" />)
    expect(screen.getByText('Nenhum livro ainda')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renderiza descrição quando fornecida', () => {
    render(
      <EmptyState
        icon={Inbox}
        title="Sem itens"
        description="Adicione o primeiro item para começar"
      />,
    )
    expect(screen.getByText('Adicione o primeiro item para começar')).toBeInTheDocument()
  })

  it('não renderiza descrição quando omitida', () => {
    render(<EmptyState icon={Inbox} title="Sem itens" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })

  it('renderiza botão de ação e chama onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <EmptyState
        icon={BookOpen}
        title="Vazio"
        action={{ label: 'Adicionar', onClick }}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('não renderiza botão quando action não é fornecida', () => {
    render(<EmptyState icon={BookOpen} title="Vazio" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('aplica className customizado', () => {
    render(<EmptyState icon={BookOpen} title="Vazio" className="min-h-screen" />)
    expect(screen.getByRole('status')).toHaveClass('min-h-screen')
  })
})
