import React from 'react'
import { GraphNode } from '@/lib/registry/api'
import { getStatusColor, formatDate } from '@/lib/presentation/helpers'
import { Badge } from '@/components/ui/badge'

export function ObjectOverview({ node }: { node: GraphNode }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase border-b border-[var(--ax-border)] pb-2">Overview</h2>
        <p className="text-[var(--ax-muted)] text-lg leading-relaxed">{node.summary}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-4">
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Status</div>
            <Badge variant={getStatusColor(node.status)}>{node.status}</Badge>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Repository</div>
            <div className="font-mono text-sm text-[var(--ax-text)]">{node.repository}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Last Updated</div>
            <div className="text-sm font-medium text-[var(--ax-text)]">{formatDate(node.updatedAt)}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Created</div>
            <div className="text-sm font-medium text-[var(--ax-text)]">{formatDate(node.createdAt)}</div>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase border-b border-[var(--ax-border)] pb-2">Metadata</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Type</div>
            <div className="text-sm font-medium text-[var(--ax-text)]">{node.type}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Revision</div>
            <div className="font-mono text-sm text-[var(--ax-text)]">{node.revision}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Tags</div>
            <div className="text-sm font-medium text-[var(--ax-text)] capitalize">
              {node.tags.length > 0 ? node.tags.join(', ') : 'None'}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-wider mb-2">Evidence</div>
            <div className="text-sm font-medium text-[var(--ax-text)]">
              {node.incomingEdges.filter(e => e.relation === 'Supports').length} Linked
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
