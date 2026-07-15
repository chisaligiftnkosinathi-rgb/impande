import React from "react"
import Link from "next/link"
import { searchRegistry } from "@/lib/registry/api"
import { getStatusColor, formatDate } from "@/lib/presentation/helpers"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal } from "lucide-react"

export default async function ObjectsList() {
  const objects = await searchRegistry("")
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[var(--ax-border)] pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ax-text)]">Knowledge Objects</h1>
          <p className="text-[var(--ax-muted)] mt-1 font-medium text-sm">Manage all intelligence artifacts in the registry</p>
        </div>
        <Link href="/admin/objects/new" className="bg-[var(--ax-text)] text-[var(--ax-background)] px-4 py-2.5 rounded-md font-bold flex items-center text-sm shadow-md hover:bg-[var(--ax-primary)] hover:text-[var(--ax-background)] transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Create Object
        </Link>
      </div>

      <div className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border border-[var(--ax-border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--ax-border)] flex gap-4 bg-[var(--ax-surface)]/30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--ax-muted)]" />
            <input 
              type="text" 
              placeholder="Filter objects by ID, Title, or Summary..." 
              className="w-full pl-9 pr-4 py-2.5 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg text-sm font-medium text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)] focus:ring-1 focus:ring-[var(--ax-primary)] transition-all"
            />
          </div>
          <select className="bg-[var(--ax-background)] border border-[var(--ax-border)] rounded-lg px-4 font-medium text-sm text-[var(--ax-text)] outline-none hover:border-[var(--ax-primary)] transition-colors cursor-pointer">
            <option>All Types</option>
            <option>Software</option>
            <option>Publication</option>
          </select>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-[var(--ax-muted)] uppercase tracking-widest bg-[var(--ax-background)]/50 border-b border-[var(--ax-border)]">
            <tr>
              <th className="px-6 py-4 font-bold">ID</th>
              <th className="px-6 py-4 font-bold">Type</th>
              <th className="px-6 py-4 font-bold">Title</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Updated</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--ax-border)]/50">
            {objects.map(obj => (
              <tr key={obj.id} className="hover:bg-[var(--ax-primary)]/5 transition-colors group">
                <td className="px-6 py-4 font-mono font-bold text-[var(--ax-text)] group-hover:text-[var(--ax-primary)] transition-colors">{obj.id}</td>
                <td className="px-6 py-4 font-medium text-[var(--ax-muted)]">{obj.type}</td>
                <td className="px-6 py-4 font-semibold text-[var(--ax-text)]">{obj.title}</td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusColor(obj.status)} className="shadow-sm">{obj.status}</Badge>
                </td>
                <td className="px-6 py-4 text-[var(--ax-muted)] font-medium text-xs">{formatDate(obj.updatedAt)}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/objects/${obj.id}`} className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-[var(--ax-background)] border border-[var(--ax-border)] text-xs font-bold text-[var(--ax-text)] hover:border-[var(--ax-primary)] hover:text-[var(--ax-primary)] transition-all">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
