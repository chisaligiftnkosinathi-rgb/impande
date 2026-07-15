import { getObservatoryMetrics, getRecentResearch } from "@/lib/registry/api"
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
