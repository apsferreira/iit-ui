import * as React from 'react'
import { cn } from '../../lib'
import { Button } from '../Button'

export interface EmptyStateAction {
  label: string
  onClick: () => void
}

export interface EmptyStateProps {
  /** Ícone Lucide passado como componente React (ex: BookOpen) */
  icon: React.ElementType
  title: string
  description?: string
  /** Botão de ação opcional */
  action?: EmptyStateAction
  className?: string
  /** Cor do ícone (padrão: usa --product-primary via CSS variable) */
  iconColor?: string
  /** Cor de fundo do container do ícone */
  iconBgColor?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  iconColor,
  iconBgColor,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
      role="status"
      aria-label={title}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
        style={{
          backgroundColor: iconBgColor ?? 'var(--product-primary-subtle, #F5F8FA)',
        }}
        aria-hidden="true"
      >
        <Icon
          className="w-8 h-8"
          style={{ color: iconColor ?? 'var(--product-primary, #0097D6)' }}
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold text-[#0D1B26] dark:text-white mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-[#4A6070] dark:text-[#8A9FAF] max-w-sm mb-4">
          {description}
        </p>
      )}

      {action && (
        <Button
          variant="secondary"
          size="md"
          onClick={action.onClick}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'
