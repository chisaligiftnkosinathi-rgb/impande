const fs = require('fs');
const path = require('path');

const adminObjectsDir = path.join(__dirname, '../src/app/admin/objects');
const editorDir = path.join(adminObjectsDir, '[id]');
if (!fs.existsSync(editorDir)) fs.mkdirSync(editorDir, { recursive: true });

// We need server actions for mutations first.
const adminActionsTs = `"use server"

import { registryRepo } from "@/lib/registry/repository"
import { KnowledgeObject, RegistryEdge } from "@/lib/registry/types"
import { revalidatePath } from "next/cache"

export async function updateObjectAction(id: string, data: Partial<KnowledgeObject>) {
  try {
    await registryRepo.updateObject(id, data)
    revalidatePath(\`/admin/objects/\${id}\`)
    revalidatePath("/admin/objects")
    revalidatePath(\`/objects/\${id}\`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function addEdgeAction(edge: RegistryEdge) {
  try {
    await registryRepo.addEdge(edge)
    revalidatePath(\`/admin/objects/\${edge.from}\`)
    revalidatePath(\`/admin/objects/\${edge.to}\`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function removeEdgeAction(edge: RegistryEdge) {
  try {
    await registryRepo.removeEdge(edge)
    revalidatePath(\`/admin/objects/\${edge.from}\`)
    revalidatePath(\`/admin/objects/\${edge.to}\`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
`;
fs.writeFileSync(path.join(__dirname, '../src/app/admin/actions.ts'), adminActionsTs);


const editorPageTsx = `import React from "react"
import { notFound } from "next/navigation"
import { registryRepo } from "@/lib/registry/repository"
import Link from "next/link"
import { ArrowLeft, Save, Plus, Trash2, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStatusColor, formatDate } from "@/lib/presentation/helpers"

export default async function ObjectEditor({ params }: { params: { id: string } }) {
  const obj = await registryRepo.getObjectById(params.id)
  
  if (!obj) {
    notFound()
  }

  const edges = await registryRepo.getEdgesByNode(obj.id)
  const incoming = edges.filter(e => e.to === obj.id)
  const outgoing = edges.filter(e => e.from === obj.id)

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center border-b border-[var(--ax-border)] pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/objects" className="text-[var(--ax-muted)] hover:text-[var(--ax-text)] transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--ax-text)] flex items-center gap-3">
              {obj.id} 
              <Badge variant={getStatusColor(obj.status)}>{obj.status}</Badge>
            </h1>
            <p className="text-[var(--ax-muted)] text-sm">{obj.title}</p>
          </div>
        </div>
        <button className="bg-[var(--ax-primary)] text-[var(--ax-background)] px-4 py-2 rounded font-medium flex items-center text-sm hover:opacity-90 transition-opacity">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
            <CardHeader className="border-b border-[var(--ax-border)] pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-[var(--ax-text)]">Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ax-muted)] mb-1 uppercase">Title</label>
                <input type="text" defaultValue={obj.title} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 py-2 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--ax-muted)] mb-1 uppercase">Summary</label>
                <textarea rows={3} defaultValue={obj.summary} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 py-2 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] resize-none" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
            <CardHeader className="border-b border-[var(--ax-border)] pb-3 flex flex-row justify-between items-center">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-[var(--ax-text)]">Relationship Manager</CardTitle>
              <button className="text-xs text-[var(--ax-primary)] hover:underline flex items-center"><Plus className="h-3 w-3 mr-1"/> Add Edge</button>
            </CardHeader>
            <CardContent className="pt-4">
               {/* Visual Edge Editor */}
               <div className="flex flex-col items-center justify-center space-y-6 py-4 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-md">
                 
                 {/* Incoming Edges */}
                 {incoming.length > 0 ? incoming.map((edge, i) => (
                   <div key={i} className="flex items-center gap-3 w-full px-8">
                     <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded text-xs font-mono w-40 text-center">{edge.from}</div>
                     <div className="flex-1 flex items-center">
                       <div className="h-px bg-[var(--ax-primary)] flex-1"></div>
                       <span className="px-2 py-0.5 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-full text-[10px] text-[var(--ax-muted)] -mx-3 relative z-10">{edge.relation}</span>
                       <div className="h-px bg-[var(--ax-primary)] flex-1 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-[var(--ax-primary)]"></div></div>
                     </div>
                     <button className="text-[var(--ax-muted)] hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                   </div>
                 )) : <p className="text-xs text-[var(--ax-muted)] italic">No incoming relationships.</p>}

                 {/* Center Node */}
                 <div className="px-6 py-3 bg-[var(--ax-primary)] text-[var(--ax-background)] rounded font-bold shadow-lg my-2">
                   {obj.id}
                 </div>

                 {/* Outgoing Edges */}
                 {outgoing.length > 0 ? outgoing.map((edge, i) => (
                   <div key={i} className="flex items-center gap-3 w-full px-8">
                     <div className="flex-1 flex items-center">
                       <div className="h-px bg-[var(--ax-primary)] flex-1"></div>
                       <span className="px-2 py-0.5 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-full text-[10px] text-[var(--ax-muted)] -mx-3 relative z-10">{edge.relation}</span>
                       <div className="h-px bg-[var(--ax-primary)] flex-1 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-[var(--ax-primary)]"></div></div>
                     </div>
                     <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded text-xs font-mono w-40 text-center">{edge.to}</div>
                     <button className="text-[var(--ax-muted)] hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                   </div>
                 )) : <p className="text-xs text-[var(--ax-muted)] italic">No outgoing relationships.</p>}

               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
            <CardHeader className="border-b border-[var(--ax-border)] pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-[var(--ax-text)]">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ax-muted)] mb-1 uppercase">Type</label>
                <select defaultValue={obj.type} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 py-2 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)]">
                  <option>Software</option>
                  <option>Publication</option>
                  <option>EvidencePackage</option>
                  <option>Standard</option>
                  <option>Product</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--ax-muted)] mb-1 uppercase">Repository</label>
                <input type="text" defaultValue={obj.repository} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 py-2 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--ax-muted)] mb-1 uppercase">Tags (comma separated)</label>
                <input type="text" defaultValue={obj.tags?.join(', ')} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 py-2 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
            <CardHeader className="border-b border-[var(--ax-border)] pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-[var(--ax-text)]">Timeline / Immutable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs font-mono text-[var(--ax-muted)]">
              <div className="flex justify-between border-b border-[var(--ax-border)] pb-1">
                <span>Created At</span>
                <span>{formatDate(obj.createdAt)}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--ax-border)] pb-1">
                <span>Updated At</span>
                <span>{formatDate(obj.updatedAt)}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--ax-border)] pb-1">
                <span>Created By</span>
                <span>{obj.createdBy || 'system'}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Revision</span>
                <span>v{obj.revision || 1}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
`;
fs.writeFileSync(path.join(editorDir, 'page.tsx'), editorPageTsx);

console.log('Object Editor Scaffolded successfully.');
