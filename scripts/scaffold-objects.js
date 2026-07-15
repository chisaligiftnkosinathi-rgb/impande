const fs = require('fs');
const path = require('path');

const objectsDir = path.join(__dirname, '../src/app/objects/[id]');
if (!fs.existsSync(objectsDir)) fs.mkdirSync(objectsDir, { recursive: true });

const pageTsx = `import React from 'react';
import { notFound } from 'next/navigation';
import { getObjectGraph } from '@/lib/registry/api';
import { getStatusColor, formatDate } from '@/lib/presentation/helpers';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function ObjectPage({ params }: { params: { id: string } }) {
  const node = await getObjectGraph(params.id);

  if (!node) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      {/* Object Header */}
      <div className="pb-6 border-b border-[var(--ax-border)]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[var(--ax-muted)] font-mono text-sm">{node.id}</span>
          <Badge variant={getStatusColor(node.status)}>{node.status}</Badge>
          <span className="text-[var(--ax-muted)] text-sm px-2 border-l border-[var(--ax-border)]">{node.type}</span>
        </div>
        <h1 className="text-4xl font-bold text-[var(--ax-text)] tracking-tight">{node.title}</h1>
      </div>

      {/* Overview */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase border-b border-[var(--ax-border)] pb-2">Overview</h2>
        <p className="text-[var(--ax-muted)] text-lg leading-relaxed">{node.summary}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4">
          <div>
            <div className="text-xs text-[var(--ax-muted)] uppercase mb-1">Repository</div>
            <div className="font-mono text-sm">{node.repository}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--ax-muted)] uppercase mb-1">Last Updated</div>
            <div className="text-sm">{formatDate(node.updatedAt)}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--ax-muted)] uppercase mb-1">Created</div>
            <div className="text-sm">{formatDate(node.createdAt)}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--ax-muted)] uppercase mb-1">Tags</div>
            <div className="text-sm capitalize">{node.tags.join(', ')}</div>
          </div>
        </div>
      </section>

      {/* Graph Preview */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase border-b border-[var(--ax-border)] pb-2">Knowledge Graph Preview</h2>
        <div className="p-8 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded-md flex flex-col items-center justify-center space-y-4 font-mono text-sm">
          {node.incomingEdges.length > 0 && (
            <>
              <div className="flex gap-4">
                {node.incomingEdges.map(e => (
                  <Link key={e.from} href={\`/objects/\${e.from}\`} className="px-3 py-1 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded hover:border-[var(--ax-primary)] transition-colors">
                    {e.from}
                  </Link>
                ))}
              </div>
              <div className="h-6 border-l border-dashed border-[var(--ax-primary)] flex items-center justify-center relative">
                <span className="absolute bg-[var(--ax-surface)] text-[10px] text-[var(--ax-muted)] px-1 py-0.5 border border-[var(--ax-border)] rounded">{node.incomingEdges[0]?.relation}</span>
              </div>
            </>
          )}

          <div className="px-4 py-2 bg-[var(--ax-primary)] text-[var(--ax-background)] rounded font-bold">
            {node.id}
          </div>

          {node.outgoingEdges.length > 0 && (
            <>
              <div className="h-6 border-l border-dashed border-[var(--ax-primary)] flex items-center justify-center relative">
                <span className="absolute bg-[var(--ax-surface)] text-[10px] text-[var(--ax-muted)] px-1 py-0.5 border border-[var(--ax-border)] rounded">{node.outgoingEdges[0]?.relation}</span>
              </div>
              <div className="flex gap-4">
                {node.outgoingEdges.map(e => (
                  <Link key={e.to} href={\`/objects/\${e.to}\`} className="px-3 py-1 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded hover:border-[var(--ax-primary)] transition-colors">
                    {e.to}
                  </Link>
                ))}
              </div>
            </>
          )}
          {node.incomingEdges.length === 0 && node.outgoingEdges.length === 0 && (
            <span className="text-[var(--ax-muted)]">No connected edges.</span>
          )}
        </div>
      </section>

      {/* Relationships Detail */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase border-b border-[var(--ax-border)] pb-2">Related Objects</h2>
        <div className="grid gap-4 md:grid-cols-2">
           {[...node.incomingEdges, ...node.outgoingEdges].map(edge => {
             const relatedId = edge.from === node.id ? edge.to : edge.from;
             const direction = edge.from === node.id ? 'Outgoing' : 'Incoming';
             return (
               <Card key={\`\${edge.from}-\${edge.to}\`} className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
                 <CardContent className="p-4 flex flex-col justify-center">
                   <div className="flex items-center justify-between">
                     <Link href={\`/objects/\${relatedId}\`} className="text-sm font-bold text-[var(--ax-text)] hover:text-[var(--ax-primary)] underline-offset-2 hover:underline">{relatedId}</Link>
                     <Badge variant="outline" className="text-[10px] uppercase">{direction}: {edge.relation}</Badge>
                   </div>
                 </CardContent>
               </Card>
             );
           })}
           {node.incomingEdges.length === 0 && node.outgoingEdges.length === 0 && (
             <p className="text-sm text-[var(--ax-muted)]">No direct relationships found.</p>
           )}
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(path.join(objectsDir, 'page.tsx'), pageTsx);

const actionsTs = `"use server"

import { searchRegistry as internalSearch } from '@/lib/registry/api';

export async function searchRegistryAction(query: string) {
  return await internalSearch(query);
}
`;

fs.writeFileSync(path.join(__dirname, '../src/app/actions.ts'), actionsTs);

console.log('Object route and server action generated.');
