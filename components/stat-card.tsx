import { type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info'
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    destructive: 'border-l-4 border-l-destructive',
    info: 'border-l-4 border-l-info',
  }

  return (
    <Card className={cn('p-4', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-muted">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </Card>
  )
}
