"use client"

import React, { useState, useEffect, use } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Archive, Trash2, Plus, GripVertical } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { KnowledgeObject, RegistryEdge } from "@/lib/registry/types"
import { Badge } from "@/components/ui/badge"
import { updateObjectAction, archiveObjectAction, addEdgeAction, removeEdgeAction, getObjectAction, getObjectEdgesAction } from "../../actions"

export default function ObjectEditor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const [obj, setObj] = useState<KnowledgeObject | null>(null)
  const [edges, setEdges] = useState<RegistryEdge[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<KnowledgeObject>>({})

  useEffect(() => {
    async function load() {
      const data = await getObjectAction(id)
      if (data) {
        setObj(data)
        setFormData({
          id: data.id,
          title: data.title,
          summary: data.summary,
          type: data.type,
          status: data.status,
          repository: data.repository
        })
      }
      const edgesData = await getObjectEdgesAction(id)
      setEdges(edgesData || [])
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="p-10 text-[var(--ax-muted)] font-mono animate-pulse">Loading Object {id}...</div>
  if (!obj) return <div className="p-10 text-[var(--ax-error)] font-mono">Object {id} not found</div>

  async function handleSave() {
    setSaving(true)
    await updateObjectAction(id, formData)
    setSaving(false)
  }

  async function handleArchive() {
    if (confirm("Are you sure you want to archive this object?")) {
      await archiveObjectAction(id)
      window.location.href = "/admin/objects"
    }
  }

  async function handleDeleteEdge(edge: RegistryEdge) {
    if (confirm("Remove this relationship?")) {
      await removeEdgeAction(edge)
      const edgesData = await getObjectEdgesAction(id)
      setEdges(edgesData || [])
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end border-b border-[var(--ax-border)] pb-6 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/objects" className="flex items-center justify-center h-10 w-10 rounded-full border border-[var(--ax-border)] bg-[var(--ax-surface)] text-[var(--ax-muted)] hover:text-[var(--ax-primary)] hover:border-[var(--ax-primary)] transition-all shadow-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ax-text)]">{obj.title}</h1>
            <p className="text-[var(--ax-muted)] font-medium text-sm mt-1">{obj.id} • {obj.type}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={handleArchive}
            className="bg-[var(--ax-surface)] text-[var(--ax-error)] border border-[var(--ax-error)]/30 hover:bg-[var(--ax-error)] hover:text-white px-4 py-2.5 rounded-md font-bold flex items-center text-sm transition-all shadow-sm"
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </button>
          <button 
            type="button" 
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--ax-text)] text-[var(--ax-background)] hover:bg-[var(--ax-primary)] px-5 py-2.5 rounded-md font-bold flex items-center text-sm transition-all shadow-md disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30 py-4 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--ax-text)]">Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">ID (Immutable)</label>
                <input type="text" value={formData.id} disabled className="w-full bg-[var(--ax-background)]/50 border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--ax-muted)] cursor-not-allowed font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Summary</label>
                <textarea rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-3 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all resize-y" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30 py-4 px-6 flex justify-between flex-row items-center">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--ax-text)]">Relationships</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--ax-border)]/50">
                {edges.map((e, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 hover:bg-[var(--ax-background)]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[var(--ax-primary)]">{e.from}</span>
                      <span className="text-[10px] font-bold text-[var(--ax-muted)] uppercase tracking-wider bg-[var(--ax-background)] px-2 py-1 rounded border border-[var(--ax-border)]">{e.relation}</span>
                      <span className="font-mono text-xs font-bold text-[var(--ax-text)]">{e.to}</span>
                    </div>
                    <button onClick={() => handleDeleteEdge(e)} className="text-[var(--ax-muted)] hover:text-[var(--ax-error)] p-2 rounded-md hover:bg-[var(--ax-error)]/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {edges.length === 0 && (
                  <div className="p-8 text-center text-sm font-medium text-[var(--ax-muted)]">No active relationships for this object.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30 py-4 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--ax-text)]">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all">
                  <option>Software</option>
                  <option>Publication</option>
                  <option>EvidencePackage</option>
                  <option>Standard</option>
                  <option>Product</option>
                  <option>Programme</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all">
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Deprecated</option>
                  <option>Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Repository</label>
                <input type="text" value={formData.repository} onChange={e => setFormData({...formData, repository: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[var(--ax-background)]/30 border-[var(--ax-border)] rounded-xl overflow-hidden shadow-inner">
            <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30 py-4 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--ax-text)]">System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex justify-between items-center text-sm border-b border-[var(--ax-border)]/50 pb-3">
                <span className="text-[var(--ax-muted)] font-medium">Revision</span>
                <span className="font-mono font-bold text-[var(--ax-text)]">{obj.revision}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-[var(--ax-border)]/50 pb-3">
                <span className="text-[var(--ax-muted)] font-medium">Updated By</span>
                <span className="font-mono font-bold text-[var(--ax-text)]">{obj.updatedBy}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-[var(--ax-border)]/50 pb-3">
                <span className="text-[var(--ax-muted)] font-medium">Created By</span>
                <span className="font-mono font-bold text-[var(--ax-text)]">{obj.createdBy}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--ax-muted)] font-medium">Created</span>
                <span className="text-[var(--ax-text)] text-xs font-medium">{new Date(obj.createdAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
