import { useState } from 'react'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'astro', label: 'Astro' },
]

export default function SelectDemo() {
  const [value, setValue] = useState('')

  return (
    <div className="rounded-xl border border-[#D0DDE6] bg-white overflow-hidden mb-6">
      <div className="border-b border-[#D0DDE6] px-5 py-3 bg-[#F5F8FA]">
        <span className="text-sm font-semibold text-[#0D1B26]">Demo interativo</span>
      </div>
      <div className="p-6 flex gap-6 items-start flex-wrap">
        <div className="w-64 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0D1B26]">Framework preferido</label>
          <div className="relative">
            <select
              value={value}
              onChange={e => setValue(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#D0DDE6] bg-white px-3 py-2 pr-9 text-sm text-[#0D1B26] focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:border-[#0097D6]"
            >
              <option value="" disabled>Selecione um framework...</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9FAF] pointer-events-none">▾</div>
          </div>
        </div>
        {value && (
          <div className="flex items-center gap-2 mt-6">
            <span className="text-sm text-[#4A6070]">Selecionado:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset bg-[#EBF4FB] text-[#006FA3] ring-[#0097D6]/30">
              {options.find(o => o.value === value)?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
