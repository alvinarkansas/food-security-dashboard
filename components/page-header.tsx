import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="pl-16 pr-6 py-4 sm:px-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground hidden sm:block">{description}</p>
            )}
          </div>
          {actions && <div className="flex flex-col sm:flex-row items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  )
}
