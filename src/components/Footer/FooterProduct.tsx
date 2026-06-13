import * as React from 'react'
import { cn } from '../../lib'

export interface FooterProductLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterProductProps {
  /** Nome do produto exibido ao lado do logo. Ex: "Catraca Virtual" */
  productName: string
  /** URL de destino do logo do produto. */
  productHref?: string
  /** Ícone/logo do produto (elemento React, ex: <img> ou <svg>). Opcional. */
  productLogo?: React.ReactNode
  /** Links de navegação principais (coluna Produto). */
  links?: FooterProductLink[]
  /** Links legais: Termos, Privacidade, Suporte. */
  legalLinks?: FooterProductLink[]
  /** Ano do copyright. Default: ano atual. */
  year?: number
  className?: string
}

export function FooterProduct({
  productName,
  productHref = 'https://institutoitinerante.com.br',
  productLogo,
  links = [],
  legalLinks = [],
  year,
  className,
}: FooterProductProps) {
  const currentYear = year ?? new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t pt-10 pb-12 px-4',
        'border-[#e2e8f0] bg-[#f8fafc]',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn('grid gap-8 mb-8', links.length > 0 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2')}>
          {/* Brand */}
          <div>
            <a
              href={productHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097D6] focus-visible:ring-offset-2"
              aria-label={productName}
            >
              {productLogo ?? (
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.7 }}
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
              )}
              <span className="text-sm font-semibold text-[#64748b]">{productName}</span>
            </a>
            <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
              Um produto do Instituto Itinerante de Tecnologia.
            </p>
          </div>

          {/* Links de navegação */}
          {links.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">
                Produto
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[#94a3b8] hover:text-[#64748b] transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links legais */}
          {legalLinks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">
                Legal & Suporte
              </h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[#94a3b8] hover:text-[#64748b] transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e2e8f0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#94a3b8]">
            &copy; {currentYear} Instituto Itinerante de Tecnologia
          </p>
          <a
            href="https://institutoitinerante.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors duration-150"
          >
            institutoitinerante.com.br
          </a>
        </div>
      </div>
    </footer>
  )
}
