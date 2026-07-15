import React from 'react'
import { GraphNode } from '@/lib/registry/api'
import { formatDate } from '@/lib/presentation/helpers'

export function ObjectTimeline({ node }: { node: GraphNode }) {
  // In a real system, you'd fetch an event log. 
  // Here we reconstruct the timeline from object metadata.
  
  const events = [
    {
      id: 'created',
      date: node.createdAt,
      title: 'Object Created',
      description: `Initial registration of ${node.id} into the Observatory by ${node.createdBy}.`,
      icon: '🌱',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    ...node.incomingEdges.map((edge, i) => ({
      id: `in-${i}`,
      date: node.createdAt, // We don't have edge dates, so we cluster them
      title: `Relationship Established: ${edge.relation}`,
      description: `${edge.from} was linked to this object.`,
      icon: '🔗',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    })),
    ...node.outgoingEdges.map((edge, i) => ({
      id: `out-${i}`,
      date: node.createdAt,
      title: `Relationship Established: ${edge.relation}`,
      description: `This object was linked to ${edge.to}.`,
      icon: '🔗',
      color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    })),
    {
      id: 'updated',
      date: node.updatedAt,
      title: `Revision ${node.revision}`,
      description: `Object was updated to revision ${node.revision} by ${node.updatedBy}. Current status is ${node.status}.`,
      icon: '📝',
      color: 'bg-[var(--ax-primary)]/20 text-[var(--ax-primary)] border-[var(--ax-primary)]/30'
    }
  ]

  // Sort events chronologically (roughly)
  // We'll just put created first, relationships middle, updated last since we don't have real timestamps for edges.
  const sortedEvents = [
    events[0],
    ...events.slice(1, -1),
    events[events.length - 1]
  ]

  // Filter out duplicates if createdAt === updatedAt and no edges
  const displayEvents = node.revision === 1 && node.incomingEdges.length === 0 && node.outgoingEdges.length === 0
    ? [events[0]] 
    : sortedEvents

  return (
    <div className="animate-in fade-in duration-500">
      <div className="relative border-l-2 border-[var(--ax-border)]/50 ml-4 py-4 space-y-12">
        {displayEvents.map((event, idx) => (
          <div key={event.id} className="relative pl-8">
            <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-2 bg-[var(--ax-background)] flex items-center justify-center text-xs shadow-sm ${event.color}`}>
              {event.icon}
            </div>
            
            <div className="bg-[var(--ax-surface)]/50 border border-[var(--ax-border)]/50 rounded-xl p-5 shadow-sm hover:border-[var(--ax-primary)] transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-[var(--ax-text)]">{event.title}</h3>
                <span className="text-xs font-mono text-[var(--ax-muted)]">{formatDate(event.date)}</span>
              </div>
              <p className="text-sm text-[var(--ax-muted)] leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
