import React from "react"
import Link from "next/link"
import { Database, FolderTree, Hexagon, FileText, Settings, ShieldCheck } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--ax-background)] selection:bg-[var(--ax-primary)] selection:text-[var(--ax-background)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[var(--ax-border)] bg-[var(--ax-surface)]/80 backdrop-blur-md flex flex-col shadow-[var(--ax-shadow-glass)] z-10 relative">
        <div className="h-16 flex items-center px-6 border-b border-[var(--ax-border)] bg-gradient-to-r from-[var(--ax-surface)] to-transparent">
          <Hexagon className="h-5 w-5 text-[var(--ax-primary)] mr-3" />
          <span className="font-bold tracking-widest text-[var(--ax-text)] text-xs uppercase opacity-90">Observatory OS</span>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-text)] hover:bg-[var(--ax-primary)]/10 hover:text-[var(--ax-primary)] transition-all duration-200">
            <Database className="mr-3 h-4 w-4 opacity-70" />
            Overview
          </Link>
          <div className="pt-5 pb-2">
            <p className="px-3 text-[10px] font-bold text-[var(--ax-muted)] uppercase tracking-[0.2em]">Registry Domains</p>
          </div>
          <Link href="/admin/objects" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-text)] hover:bg-[var(--ax-primary)]/10 hover:text-[var(--ax-primary)] transition-all duration-200">
            <FileText className="mr-3 h-4 w-4 opacity-70" />
            Knowledge
          </Link>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <FolderTree className="mr-3 h-4 w-4 opacity-70" />
            Repositories
          </span>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <ShieldCheck className="mr-3 h-4 w-4 opacity-70" />
            Evidence
          </span>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <Hexagon className="mr-3 h-4 w-4 opacity-70" />
            Standards
          </span>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <Database className="mr-3 h-4 w-4 opacity-70" />
            Products
          </span>
          <div className="pt-5 pb-2">
            <p className="px-3 text-[10px] font-bold text-[var(--ax-muted)] uppercase tracking-[0.2em]">Analysis</p>
          </div>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <FolderTree className="mr-3 h-4 w-4 opacity-70" />
            Graph
          </span>
          <div className="pt-5 pb-2">
            <p className="px-3 text-[10px] font-bold text-[var(--ax-muted)] uppercase tracking-[0.2em]">System</p>
          </div>
          <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-[var(--ax-muted)] opacity-50 cursor-not-allowed">
            <Settings className="mr-3 h-4 w-4 opacity-70" />
            Settings
          </span>
        </nav>
        
        <div className="p-4 border-t border-[var(--ax-border)] text-xs text-[var(--ax-muted)] bg-[var(--ax-surface)]/50">
          <Link href="/" className="hover:text-[var(--ax-primary)] transition-colors flex items-center font-medium opacity-80 hover:opacity-100">
            <span className="mr-2">←</span> Back to Observatory
          </Link>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
