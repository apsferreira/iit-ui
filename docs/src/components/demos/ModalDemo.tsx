import { useState } from 'react'

export default function ModalDemo() {
  const [openDefault, setOpenDefault] = useState(false)
  const [openSm, setOpenSm] = useState(false)
  const [openLg, setOpenLg] = useState(false)
  const [openDestructive, setOpenDestructive] = useState(false)

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  type ModalConfig = {
    open: boolean
    onClose: () => void
    title: string
    description: string
    size: string
    destructive?: boolean
  }

  function Modal({ open, onClose, title, description, size, destructive, children }: ModalConfig & { children: React.ReactNode }) {
    if (!open) return null
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl border border-[#D0DDE6] p-6 animate-[fadeIn_0.15s_ease]`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0D1B26]">{title}</h2>
              {description && <p className="text-sm text-[#4A6070] mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-[#8A9FAF] hover:text-[#0D1B26] transition-colors p-1 rounded-lg hover:bg-[#F5F8FA] ml-4 shrink-0"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#D0DDE6] bg-white overflow-hidden">
        <div className="border-b border-[#D0DDE6] px-5 py-3 bg-[#F5F8FA]">
          <span className="text-sm font-semibold text-[#0D1B26]">Tamanhos disponíveis</span>
        </div>
        <div className="p-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setOpenSm(true)}
            className="inline-flex items-center gap-1.5 rounded-lg font-medium h-9 px-4 text-sm bg-[#F5F8FA] text-[#0D1B26] border border-[#D0DDE6] hover:border-[#0097D6] transition-colors"
          >
            🪟 size=sm
          </button>
          <button
            onClick={() => setOpenDefault(true)}
            className="inline-flex items-center gap-1.5 rounded-lg font-medium h-9 px-4 text-sm bg-[#0097D6] text-white hover:bg-[#006FA3] transition-colors"
          >
            🪟 size=md (default)
          </button>
          <button
            onClick={() => setOpenLg(true)}
            className="inline-flex items-center gap-1.5 rounded-lg font-medium h-9 px-4 text-sm bg-[#00D6A0] text-white hover:bg-[#00A87E] transition-colors"
          >
            🪟 size=lg
          </button>
          <button
            onClick={() => setOpenDestructive(true)}
            className="inline-flex items-center gap-1.5 rounded-lg font-medium h-9 px-4 text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
          >
            🗑️ Ação destrutiva
          </button>
        </div>
      </div>

      <Modal open={openSm} onClose={() => setOpenSm(false)} title="Modal Pequeno" description="Ideal para confirmações simples." size="sm">
        <p className="text-sm text-[#4A6070]">Este modal usa <code className="font-mono text-[#0097D6] text-xs">size="sm"</code> com largura máxima de 384px.</p>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setOpenSm(false)} className="h-9 px-4 text-sm rounded-lg bg-[#0097D6] text-white font-medium">OK</button>
        </div>
      </Modal>

      <Modal open={openDefault} onClose={() => setOpenDefault(false)} title="Modal Padrão" description="Tamanho md — o default do componente." size="md">
        <p className="text-sm text-[#4A6070] mb-4">Este é o modal padrão com <code className="font-mono text-[#0097D6] text-xs">size="md"</code>. Ideal para formulários e informações detalhadas.</p>
        <div className="rounded-lg border border-[#D0DDE6] p-4 bg-[#F5F8FA] text-xs font-mono text-[#4A6070]">
          {"<Modal open={open} onClose={close} title=\"...\" />"}
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setOpenDefault(false)} className="h-9 px-4 text-sm rounded-lg bg-[#0097D6] text-white font-medium">Confirmar</button>
          <button onClick={() => setOpenDefault(false)} className="h-9 px-4 text-sm rounded-lg bg-[#F5F8FA] text-[#0D1B26] border border-[#D0DDE6] font-medium">Cancelar</button>
        </div>
      </Modal>

      <Modal open={openLg} onClose={() => setOpenLg(false)} title="Modal Grande" description="Ideal para conteúdo rico ou tabelas." size="lg">
        <p className="text-sm text-[#4A6070] mb-4">Modal com <code className="font-mono text-[#0097D6] text-xs">size="lg"</code>, largura máxima de 672px. Use para formulários complexos ou previews.</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {['Coluna 1', 'Coluna 2', 'Coluna 3'].map(c => (
            <div key={c} className="rounded-lg border border-[#D0DDE6] p-3 text-xs text-[#4A6070] text-center bg-[#F5F8FA]">{c}</div>
          ))}
        </div>
        <button onClick={() => setOpenLg(false)} className="h-9 px-4 text-sm rounded-lg bg-[#00D6A0] text-white font-medium">Fechar</button>
      </Modal>

      <Modal open={openDestructive} onClose={() => setOpenDestructive(false)} title="Confirmar exclusão" description="Esta ação é irreversível." size="sm" destructive>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-700">⚠️ Ao confirmar, os dados serão permanentemente removidos.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setOpenDestructive(false)} className="h-9 px-4 text-sm rounded-lg bg-red-500 text-white font-medium hover:bg-red-600">🗑️ Excluir</button>
          <button onClick={() => setOpenDestructive(false)} className="h-9 px-4 text-sm rounded-lg bg-[#F5F8FA] text-[#0D1B26] border border-[#D0DDE6] font-medium">Cancelar</button>
        </div>
      </Modal>
    </div>
  )
}
