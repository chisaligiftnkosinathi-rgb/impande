import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  label: string
  value: number | string
  subtext?: string
}

export function MetricCard({ label, value, subtext }: MetricCardProps) {
  return (
    <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
      <CardContent className="p-4 flex flex-col justify-center">
        <p className="text-xs font-medium text-[var(--ax-muted)] uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <h3 className="text-2xl font-bold text-[var(--ax-text)]">{value}</h3>
          {subtext && <span className="text-xs text-[var(--ax-success)]">{subtext}</span>}
        </div>
      </CardContent>
    </Card>
  )
}