const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, '../src/components/dashboard');
if (!fs.existsSync(dashboardDir)) fs.mkdirSync(dashboardDir, { recursive: true });

const files = {
  'MetricCard.tsx': `import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  label: string
  value: number | string
  subtext?: string
}

export function MetricCard({ label, value, subtext }: MetricCardProps) {
  return (
    <Card className="bg-[var(--ax-surface)] border-[var(--ax-border)]">
      <CardContent className="p-4 flex flex-col justify-center">
        <p className="text-xs font-medium text-[var(--ax-muted)] uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <h3 className="text-2xl font-bold text-[var(--ax-text)]">{value}</h3>
          {subtext && <span className="text-xs text-[var(--ax-success)]">{subtext}</span>}
        </div>
      </CardContent>
    </Card>
  )
}`,

  'ActivityFeed.tsx': `import { BaseKnowledgeObject } from "@/lib/registry"
import { formatDate, getStatusColor } from "@/lib/presentation/helpers"
import { Badge } from "@/components/ui/badge"

interface ActivityFeedProps {
  items: BaseKnowledgeObject[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="relative pl-6 pb-4 border-l border-[var(--ax-border)] last:border-0 last:pb-0">
          <div className="absolute w-2 h-2 bg-[var(--ax-primary)] rounded-full -left-[4.5px] top-1.5" />
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-[var(--ax-muted)] font-mono">{formatDate(item.updatedAt)}</span>
            <span className="text-sm font-medium text-[var(--ax-text)]">{item.title}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[var(--ax-muted)]">{item.type}</span>
              <Badge variant={getStatusColor(item.status)} className="scale-75 origin-left">
                {item.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-sm text-[var(--ax-muted)]">No recent activity found.</div>
      )}
    </div>
  )
}`,

  'RepositoryHealth.tsx': `export function RepositoryHealth() {
  const checks = [
    { label: "Registry", status: "Healthy" },
    { label: "Graph", status: "Connected" },
    { label: "Evidence", status: "Available" },
    { label: "Search Index", status: "Ready" },
    { label: "Verification", status: "Online" },
  ]

  return (
    <div className="space-y-3">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center justify-between text-sm">
          <span className="text-[var(--ax-muted)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--ax-success)]" />
            {check.label}
          </span>
          <span className="text-[var(--ax-text)] font-mono text-xs border-b border-dotted border-[var(--ax-border)] pb-0.5">
            {check.status}
          </span>
        </div>
      ))}
    </div>
  )
}`,

  'KnowledgeGraphPreview.tsx': `export function KnowledgeGraphPreview() {
  return (
    <div className="w-full h-full min-h-[150px] bg-[var(--ax-background)] rounded-md border border-[var(--ax-border)] flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-2 text-xs font-mono text-[var(--ax-muted)]">
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Publication</div>
        <div className="h-4 border-l border-dashed border-[var(--ax-primary)]" />
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Software</div>
        <div className="h-4 border-l border-dashed border-[var(--ax-primary)]" />
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Evidence</div>
      </div>
    </div>
  )
}`,

  'DashboardGrid.tsx': `import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function DashboardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  )
}

export function DashboardPanel({ 
  title, 
  children, 
  className = "" 
}: { 
  title: string; 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <Card className={\`bg-[var(--ax-surface)] border-[var(--ax-border)] flex flex-col \${className}\`}>
      <CardHeader className="pb-3 border-b border-[var(--ax-border)]/50">
        <CardTitle className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        {children}
      </CardContent>
    </Card>
  )
}`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dashboardDir, filename), content);
}

// Rewrite src/app/page.tsx
const pageContent = `import { getObservatoryMetrics, getRecentResearch } from "@/lib/registry/api"
import { DashboardGrid, DashboardPanel } from "@/components/dashboard/DashboardGrid"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { RepositoryHealth } from "@/components/dashboard/RepositoryHealth"
import { KnowledgeGraphPreview } from "@/components/dashboard/KnowledgeGraphPreview"

export default async function ObservatoryDashboard() {
  const metrics = await getObservatoryMetrics()
  const recentActivity = await getRecentResearch(5)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Research Objects" value={metrics.totalObjects} />
        <MetricCard label="Evidence Packages" value={metrics.evidencePackages} />
        <MetricCard label="Publications" value={metrics.publications} />
        <MetricCard label="Software" value={metrics.software} />
        <MetricCard label="Standards" value={metrics.standards} />
        <MetricCard label="Repositories" value={metrics.repositories} subtext="Synced" />
      </div>

      <DashboardGrid>
        
        {/* Left Column (Main Feed) */}
        <DashboardPanel title="Latest Validation Activity" className="md:col-span-2 xl:col-span-2">
          <ActivityFeed items={recentActivity} />
        </DashboardPanel>
        
        {/* Right Column (Health & Graph) */}
        <div className="flex flex-col gap-6 md:col-span-1 xl:col-span-2">
          <DashboardPanel title="Repository Health">
            <RepositoryHealth />
          </DashboardPanel>
          
          <DashboardPanel title="Knowledge Graph Architecture">
            <KnowledgeGraphPreview />
          </DashboardPanel>
        </div>
        
      </DashboardGrid>

    </div>
  )
}
`;

fs.writeFileSync(path.join(__dirname, '../src/app/page.tsx'), pageContent);

console.log('Dashboard components generated and page.tsx replaced.');
