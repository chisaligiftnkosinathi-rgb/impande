import React from 'react'
import { Handle, Position } from '@xyflow/react'

export type AxionyxNodeType = 'Software' | 'Publication' | 'EvidencePackage' | 'Standard' | 'Programme' | 'Product' | string

export function GraphNodeComponent({ data }: { data: { id: string, type: AxionyxNodeType, label: string } }) {
  
  const getBorderColor = (type: AxionyxNodeType) => {
    switch (type) {
      case 'Software': return 'border-blue-500/50 shadow-blue-500/10'
      case 'Publication': return 'border-green-500/50 shadow-green-500/10'
      case 'EvidencePackage': return 'border-orange-500/50 shadow-orange-500/10'
      case 'Standard': return 'border-purple-500/50 shadow-purple-500/10'
      case 'Programme': return 'border-cyan-500/50 shadow-cyan-500/10'
      case 'Product': return 'border-yellow-500/50 shadow-yellow-500/10'
      default: return 'border-[var(--ax-border)]'
    }
  }

  const getBadgeBg = (type: AxionyxNodeType) => {
    switch (type) {
      case 'Software': return 'bg-blue-500/20 text-blue-300'
      case 'Publication': return 'bg-green-500/20 text-green-300'
      case 'EvidencePackage': return 'bg-orange-500/20 text-orange-300'
      case 'Standard': return 'bg-purple-500/20 text-purple-300'
      case 'Programme': return 'bg-cyan-500/20 text-cyan-300'
      case 'Product': return 'bg-yellow-500/20 text-yellow-300'
      default: return 'bg-[var(--ax-surface)] text-[var(--ax-muted)]'
    }
  }

  return (
    <div className={`px-4 py-3 min-w-[200px] max-w-[250px] bg-[var(--ax-background)]/80 backdrop-blur-md border ${getBorderColor(data.type)} shadow-lg rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--ax-primary)] transition-all`}>
      <Handle type="target" position={Position.Top} className="!bg-[var(--ax-muted)] !border-none !w-2 !h-2" />
      
      <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 ${getBadgeBg(data.type)}`}>
        {data.type}
      </div>
      
      <div className="font-mono text-xs font-bold text-[var(--ax-text)] mb-1">{data.id}</div>
      <div className="text-[10px] text-[var(--ax-muted)] line-clamp-2 leading-tight">{data.label}</div>

      <Handle type="source" position={Position.Bottom} className="!bg-[var(--ax-muted)] !border-none !w-2 !h-2" />
    </div>
  )
}
