"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { KnowledgeObject } from "@/lib/registry/types"
import { createObjectAction } from "../../actions"

export default function NewObject() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<KnowledgeObject>>({
    id: "",
    title: "",
    summary: "",
    type: "Software",
    status: "Draft",
    repository: ""
  })

  async function handleSave() {
    setSaving(true)
    const result = await createObjectAction(formData as KnowledgeObject)
    if (result.success) {
      window.location.href = `/admin/objects/${formData.id}`
    } else {
      alert("Error creating object: " + result.error)
      setSaving(false)
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
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ax-text)]">Create Knowledge Object</h1>
            <p className="text-[var(--ax-muted)] font-medium text-sm mt-1">Draft a new node in the Registry</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--ax-text)] text-[var(--ax-background)] hover:bg-[var(--ax-primary)] px-5 py-2.5 rounded-md font-bold flex items-center text-sm transition-all shadow-md disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Creating..." : "Create Object"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30 py-4 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--ax-text)]">Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">ID (Unique)</label>
                <input type="text" placeholder="e.g. AX-SW-0005" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all font-mono uppercase" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Title</label>
                <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--ax-muted)] mb-2 uppercase tracking-widest">Summary</label>
                <textarea rows={4} placeholder="Brief summary" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-3 text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all resize-y" />
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
                <input type="text" placeholder="e.g. axionyx-software" value={formData.repository} onChange={e => setFormData({...formData, repository: e.target.value})} className="w-full bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
