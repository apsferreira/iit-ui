import { useState } from 'react'

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="rounded-xl border border-[#D0DDE6] bg-white overflow-hidden mb-6">
      <div className="border-b border-[#D0DDE6] px-5 py-3 bg-[#F5F8FA]">
        <span className="text-sm font-semibold text-[#0D1B26]">Demo interativo — isLoading</span>
      </div>
      <div className="p-6 flex gap-4 items-center flex-wrap">
        <button
          onClick={handleLoad}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg font-medium h-9 px-4 text-sm bg-[#0097D6] text-white transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Carregando...
            </>
          ) : '⚡ Clique para testar loading'}
        </button>
        {loading && (
          <span className="text-xs text-[#8A9FAF] font-mono">isLoading=true por 2s...</span>
        )}
      </div>
    </div>
  )
}
