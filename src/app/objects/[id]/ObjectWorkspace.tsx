"use client"

import React, { useState } from 'react'
import { GraphNode } from '@/lib/registry/api'
import { getStatusColor, formatDate } from '@/lib/presentation/helpers'
import { Badge } from '@/components/ui/badge'
import { ObjectOverview } from '@/components/registry/ObjectOverview'
import { RelationshipExplorer } from '@/components/registry/RelationshipExplorer'
import { KnowledgeGraph } from '@/components/registry/KnowledgeGraph'
import { ObjectTimeline } from '@/components/registry/ObjectTimeline'

export function ObjectWorkspace({ node }: { node: GraphNode }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'relationships' | 'graph' | 'timeline'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'graph', label: 'Graph' },
    { id: 'timeline', label: 'Timeline' },
  ] as const

  return (
    <div className="space-y-8 max-w-6xl w-full">
      {/* Object Header (Always visible) */}
      <div className="pb-6 border-b border-[var(--ax-border)]">
        <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="text-[var(--ax-muted)] font-mono text-sm">{node.id}</span>
          <Badge variant={getStatusColor(node.status)}>{node.status}</Badge>
          <span className="text-[var(--ax-muted)] text-sm px-2 border-l border-[var(--ax-border)] uppercase tracking-wider text-[10px] font-bold mt-0.5">{node.type}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[var(--ax-text)] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">{node.title}</h1>
      </div>

      {/* Workspace Tabs */}
      <div className="border-b border-[var(--ax-border)] flex gap-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold uppercase tracking-widest transition-colors relative ${
              activeTab === tab.id 
                ? 'text-[var(--ax-primary)]' 
                : 'text-[var(--ax-muted)] hover:text-[var(--ax-text)]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ax-primary)]" />
            )}
          </button>
        ))}
      </div>

      {/* Workspace Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && <ObjectOverview node={node} />}
        {activeTab === 'relationships' && <RelationshipExplorer node={node} />}
        {activeTab === 'graph' && <KnowledgeGraph centerNode={node} />}
        {activeTab === 'timeline' && <ObjectTimeline node={node} />}
      </div>
    </div>
  )
}
