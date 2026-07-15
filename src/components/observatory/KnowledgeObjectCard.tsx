import * as React from "react"
import { BaseKnowledgeObject } from "@/lib/registry"
import { formatDate, getStatusColor, getObjectIcon } from "@/lib/presentation/helpers"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type KnowledgeObjectCardProps = {
  object: BaseKnowledgeObject
  relatedCount?: number
}

export function KnowledgeObjectCard({ object, relatedCount = 0 }: KnowledgeObjectCardProps) {
  const iconName = getObjectIcon(object.type)
  const statusColor = getStatusColor(object.status)
  
  return (
    <Card className="hover:shadow-[var(--ax-shadow-elevated)] transition-all bg-[var(--ax-surface)] border-[var(--ax-border)]">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex flex-col">
          <span className="text-[var(--ax-muted)] text-xs font-mono">{object.id}</span>
          <CardTitle className="text-lg mt-1 text-[var(--ax-text)]">{object.title}</CardTitle>
          <CardDescription className="text-sm mt-2 text-[var(--ax-muted)] max-w-[90%]">
            {object.summary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1 mt-2">
          <div className="text-sm flex items-center justify-between">
            <span className="text-[var(--ax-muted)]">Type:</span>
            <span className="font-medium text-[var(--ax-text)]">{object.type}</span>
          </div>
          <div className="text-sm flex items-center justify-between">
            <span className="text-[var(--ax-muted)]">Status:</span>
            <Badge variant={statusColor}>{object.status}</Badge>
          </div>
          <div className="text-sm flex items-center justify-between">
            <span className="text-[var(--ax-muted)]">Repository:</span>
            <span className="font-mono text-xs text-[var(--ax-text)]">{object.repository}</span>
          </div>
          <div className="text-sm flex items-center justify-between">
            <span className="text-[var(--ax-muted)]">Updated:</span>
            <span className="text-[var(--ax-text)]">{formatDate(object.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-[var(--ax-border)] flex items-center justify-between text-sm text-[var(--ax-muted)]">
        <div>
          {object.tags.slice(0, 2).map(tag => (
            <span key={tag} className="mr-2 capitalize">#{tag}</span>
          ))}
          {object.tags.length > 2 && <span>+{object.tags.length - 2}</span>}
        </div>
        <div className="font-mono text-xs">
          Related Objects ({relatedCount})
        </div>
      </CardFooter>
    </Card>
  )
}
