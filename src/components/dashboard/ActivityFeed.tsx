import { BaseKnowledgeObject } from "@/lib/registry"
import { formatDate, getStatusColor } from "@/lib/presentation/helpers"
import { Badge } from "@/components/ui/badge"

interface ActivityFeedProps {
  items: BaseKnowledgeObject[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="relative pl-6 pb-4 border-l border-[var(--ax-border)] last:border-0 last:pb-0">
          <div className="absolute w-2 h-2 bg-[var(--ax-primary)] rounded-full -left-[4.5px] top-1.5" />
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-[var(--ax-muted)] font-mono">{formatDate(item.updatedAt)}</span>
            <span className="text-sm font-medium text-[var(--ax-text)]">{item.title}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[var(--ax-muted)]">{item.type}</span>
              <Badge variant={getStatusColor(item.status)} className="scale-75 origin-left">
                {item.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-sm text-[var(--ax-muted)]">No recent activity found.</div>
      )}
    </div>
  )
}