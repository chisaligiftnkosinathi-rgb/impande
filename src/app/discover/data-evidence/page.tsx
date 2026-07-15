import React from 'react';
import { searchRegistry, getObjectGraph } from '@/lib/registry';
import { KnowledgeObjectCard } from '@/components/observatory/KnowledgeObjectCard';

export default async function EvidencePage() {
  const objects = await searchRegistry({ type: 'evidencepackage' });

  const graphNodes = await Promise.all(
    objects.map(obj => getObjectGraph(obj.id))
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--ax-border)] pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ax-text)]">Evidence Registry</h1>
        <p className="text-[var(--ax-muted)] mt-2">
          Cryptographic packages and datasets providing empirical support for computational claims.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {graphNodes.map((node) => {
          if (!node) return null;
          const relatedCount = node.incomingEdges.length + node.outgoingEdges.length;
          
          return (
            <KnowledgeObjectCard
              key={node.id}
              object={node}
              relatedCount={relatedCount}
            />
          );
        })}
      </div>
    </div>
  );
}
