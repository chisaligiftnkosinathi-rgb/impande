const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '../src/app/admin');
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });

const objectsDir = path.join(adminDir, 'objects');
if (!fs.existsSync(objectsDir)) fs.mkdirSync(objectsDir, { recursive: true });

// 1. Admin Layout
const layoutTsx = `import React from "react"
import Link from "next/link"
import { Database, FolderTree, Hexagon, FileText, Settings, ShieldCheck } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--ax-background)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[var(--ax-border)] bg-[var(--ax-surface)] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[var(--ax-border)]">
          <Hexagon className="h-5 w-5 text-[var(--ax-primary)] mr-3" />
          <span className="font-bold tracking-widest text-[var(--ax-text)] text-sm uppercase">Observatory OS</span>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[var(--ax-text)] hover:bg-[var(--ax-background)]">
            <Database className="mr-3 h-4 w-4 text-[var(--ax-muted)]" />
            Dashboard
          </Link>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-[var(--ax-muted)] uppercase tracking-wider">Registry</p>
          </div>
          <Link href="/admin/objects" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[var(--ax-text)] hover:bg-[var(--ax-background)]">
            <FileText className="mr-3 h-4 w-4 text-[var(--ax-muted)]" />
            Knowledge Objects
          </Link>
          <Link href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[var(--ax-muted)] hover:bg-[var(--ax-background)]">
            <FolderTree className="mr-3 h-4 w-4 text-[var(--ax-muted)]" />
            Repositories
          </Link>
          <Link href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[var(--ax-muted)] hover:bg-[var(--ax-background)]">
            <ShieldCheck className="mr-3 h-4 w-4 text-[var(--ax-muted)]" />
            Evidence & Standards
          </Link>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-[var(--ax-muted)] uppercase tracking-wider">System</p>
          </div>
          <Link href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-[var(--ax-muted)] hover:bg-[var(--ax-background)]">
            <Settings className="mr-3 h-4 w-4 text-[var(--ax-muted)]" />
            Configuration
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[var(--ax-border)] text-xs text-[var(--ax-muted)]">
          <Link href="/" className="hover:text-[var(--ax-primary)] underline">← Back to Observatory</Link>
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
`;
fs.writeFileSync(path.join(adminDir, 'layout.tsx'), layoutTsx);

// 2. Admin Dashboard (7.7.2)
const pageTsx = `import React from "react"
import { getObservatoryMetrics, getRecentResearch } from "@/lib/registry/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminDashboard() {
  const metrics = await getObservatoryMetrics()
  const recent = await getRecentResearch(5)
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-[var(--ax-border)] pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ax-text)]">Observatory Overview</h1>
        <p className="text-[var(--ax-muted)] mt-1">Live metrics and registry health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[var(--ax-muted)] uppercase">Total Objects</p>
            <h3 className="text-3xl font-bold text-[var(--ax-text)] mt-2">{metrics.totalObjects}</h3>
          </CardContent>
        </Card>
        <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[var(--ax-muted)] uppercase">Evidence Packages</p>
            <h3 className="text-3xl font-bold text-[var(--ax-text)] mt-2">{metrics.evidencePackages}</h3>
          </CardContent>
        </Card>
        <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[var(--ax-muted)] uppercase">Connected Repos</p>
            <h3 className="text-3xl font-bold text-[var(--ax-text)] mt-2">{metrics.repositories}</h3>
          </CardContent>
        </Card>
        <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)] border-l-4 border-l-[var(--ax-success)]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-[var(--ax-muted)] uppercase">Registry Status</p>
            <h3 className="text-xl font-bold text-[var(--ax-success)] mt-3">Healthy (Local JSON)</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recent.map(obj => (
                <div key={obj.id} className="flex justify-between items-center text-sm border-b border-[var(--ax-border)] pb-2 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium text-[var(--ax-text)]">{obj.id}</span>
                    <span className="text-xs text-[var(--ax-muted)]">{obj.title}</span>
                  </div>
                  <Badge variant="outline">{obj.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
`;
fs.writeFileSync(path.join(adminDir, 'page.tsx'), pageTsx);

// 3. Knowledge Objects List (7.7.3)
const objectsPageTsx = `import React from "react"
import Link from "next/link"
import { searchRegistry } from "@/lib/registry/api"
import { getStatusColor, formatDate } from "@/lib/presentation/helpers"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal } from "lucide-react"

export default async function ObjectsList() {
  const objects = await searchRegistry("")
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-[var(--ax-border)] pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--ax-text)]">Knowledge Objects</h1>
          <p className="text-[var(--ax-muted)] mt-1">Manage all intelligence artifacts in the registry</p>
        </div>
        <Link href="/admin/objects/new" className="bg-[var(--ax-primary)] text-[var(--ax-background)] px-4 py-2 rounded font-medium flex items-center text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4 mr-2" />
          Create Object
        </Link>
      </div>

      <div className="bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded-md overflow-hidden">
        <div className="p-4 border-b border-[var(--ax-border)] flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--ax-muted)]" />
            <input 
              type="text" 
              placeholder="Filter objects..." 
              className="w-full pl-9 pr-4 py-2 bg-[var(--ax-background)] border border-[var(--ax-border)] rounded text-sm text-[var(--ax-text)] outline-none focus:border-[var(--ax-primary)]"
            />
          </div>
          <select className="bg-[var(--ax-background)] border border-[var(--ax-border)] rounded px-3 text-sm text-[var(--ax-text)] outline-none">
            <option>All Types</option>
            <option>Software</option>
            <option>Publication</option>
          </select>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[var(--ax-muted)] uppercase bg-[var(--ax-background)] border-b border-[var(--ax-border)]">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {objects.map(obj => (
              <tr key={obj.id} className="border-b border-[var(--ax-border)] last:border-0 hover:bg-[var(--ax-background)] transition-colors">
                <td className="px-6 py-4 font-mono text-[var(--ax-text)]">{obj.id}</td>
                <td className="px-6 py-4 text-[var(--ax-muted)]">{obj.type}</td>
                <td className="px-6 py-4 font-medium text-[var(--ax-text)]">{obj.title}</td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusColor(obj.status)}>{obj.status}</Badge>
                </td>
                <td className="px-6 py-4 text-[var(--ax-muted)]">{formatDate(obj.updatedAt)}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={\`/admin/objects/\${obj.id}\`} className="text-[var(--ax-primary)] hover:underline font-medium">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
`;
fs.writeFileSync(path.join(objectsDir, 'page.tsx'), objectsPageTsx);

console.log('Admin Dashboard and List Scaffolded successfully.');
