import { cn } from '../../lib'

export interface FooterMinimalProps {
  /** Ano do copyright. Default: ano atual. */
  year?: number
  /** URL de destino do link do logo. Default: https://institutoitinerante.com.br */
  href?: string
  /** Links adicionais exibidos à direita (ex: Privacidade, Admin). */
  links?: { label: string; href: string; external?: boolean }[]
  className?: string
}

export function FooterMinimal({
  year,
  href = 'https://institutoitinerante.com.br',
  links = [],
  className,
}: FooterMinimalProps) {
  const currentYear = year ?? new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t pt-6 pb-10',
        'border-[#e2e8f0]',
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Lado esquerdo: logo (link) + copyright (texto separado) */}
        <div className="flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instituto Itinerante de Tecnologia"
            className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097D6] focus-visible:ring-offset-2"
          >
            {/* Logo símbolo IIT — SVG inline para evitar dependência de arquivo */}
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.5 }}
            >
              <rect width="32" height="32" rx="8" fill="#0097D6" />
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontWeight="700"
                fontSize="14"
                fill="white"
              >
                IIT
              </text>
            </svg>
          </a>
          <span className="text-xs text-[#94a3b8]">
            © {currentYear} Instituto Itinerante de Tecnologia
          </span>
        </div>

        {/* Lado direito: links opcionais */}
        {links.length > 0 && (
          <nav aria-label="Links do rodapé" className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
