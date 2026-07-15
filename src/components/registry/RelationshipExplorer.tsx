import React from 'react'
import Link from 'next/link'
import { GraphNode } from '@/lib/registry/api'
import { RegistryEdge } from '@/lib/registry/types'

export function RelationshipExplorer({ node }: { node: GraphNode }) {
  // Group edges by relationship
  const groupedIncoming = node.incomingEdges.reduce((acc, edge) => {
    if (!acc[edge.relation]) acc[edge.relation] = []
    acc[edge.relation].push(edge)
    return acc
  }, {} as Record<string, RegistryEdge[]>)

  const groupedOutgoing = node.outgoingEdges.reduce((acc, edge) => {
    if (!acc[edge.relation]) acc[edge.relation] = []
    acc[edge.relation].push(edge)
    return acc
  }, {} as Record<string, RegistryEdge[]>)

  const hasRelationships = node.incomingEdges.length > 0 || node.outgoingEdges.length > 0

  if (!hasRelationships) {
    return (
      <div className="p-10 text-center border border-dashed border-[var(--ax-border)] rounded-lg">
        <p className="text-[var(--ax-muted)] font-mono text-sm">No recorded relationships.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 font-mono text-sm">
      
      {Object.keys(groupedOutgoing).length > 0 && (
        <section className="space-y-6">
          {Object.entries(groupedOutgoing).map(([relation, edges]) => (
            <div key={relation} className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ax-primary)]">{relation}</h3>
                <div className="h-px bg-[var(--ax-border)]/50 flex-grow"></div>
              </div>
              <ul className="pl-6 space-y-3 border-l border-[var(--ax-border)]/50 ml-2">
                {edges.map(edge => (
                  <li key={edge.to} className="relative before:absolute before:content-[''] before:w-4 before:h-px before:bg-[var(--ax-border)]/50 before:-left-6 before:top-1/2 flex items-center">
                    <Link 
                      href={`/objects/${edge.to}`}
                      className="px-3 py-1.5 bg-[var(--ax-surface)]/50 hover:bg-[var(--ax-surface)] border border-[var(--ax-border)]/50 hover:border-[var(--ax-primary)] rounded text-[var(--ax-text)] transition-all"
                    >
                      {edge.to}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {Object.keys(groupedIncoming).length > 0 && (
        <section className="space-y-6">
          {Object.entries(groupedIncoming).map(([relation, edges]) => (
            <div key={relation} className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--ax-muted)]">{relation} By</h3>
                <div className="h-px bg-[var(--ax-border)]/50 flex-grow"></div>
              </div>
              <ul className="pl-6 space-y-3 border-l border-[var(--ax-border)]/50 ml-2">
                {edges.map(edge => (
                  <li key={edge.from} className="relative before:absolute before:content-[''] before:w-4 before:h-px before:bg-[var(--ax-border)]/50 before:-left-6 before:top-1/2 flex items-center">
                    <Link 
                      href={`/objects/${edge.from}`}
                      className="px-3 py-1.5 bg-[var(--ax-surface)]/50 hover:bg-[var(--ax-surface)] border border-[var(--ax-border)]/50 hover:border-[var(--ax-primary)] rounded text-[var(--ax-text)] transition-all"
                    >
                      {edge.from}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

    </div>
  )
}
