import React from "react"
import { getObservatoryMetrics, getRecentResearch } from "@/lib/registry/api"
import { registryRepo } from "@/lib/registry/repository"
import { getRepositoryHealth, getGraphHealth, getEvidenceHealth, getMetadataHealth, getValidationHealth, generateRecommendations, computeScores } from "@/lib/intelligence"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminDashboard() {
  const metrics = await getObservatoryMetrics()
  const recent = await getRecentResearch(5)
  
  const objects = await registryRepo.getAllObjects()
  const edges = await registryRepo.getAllEdges()

  const health = [
    getRepositoryHealth(objects),
    getGraphHealth(objects, edges),
    getEvidenceHealth(objects, edges),
    getMetadataHealth(objects),
    getValidationHealth(objects, edges)
  ]

  const recommendations = generateRecommendations(objects, edges).slice(0, 5)
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-[var(--ax-border)] pb-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--ax-text)] to-[var(--ax-muted)]">Observatory Intelligence</h1>
          <p className="text-[var(--ax-muted)] mt-2 font-medium tracking-wide">Live analytics, health, and stewardship</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {health.map((h, i) => (
          <Card key={i} className={`bg-[var(--ax-surface)]/40 backdrop-blur-md border-[var(--ax-border)] shadow-sm hover:shadow-[var(--ax-shadow-glass)] hover:bg-[var(--ax-surface)]/80 transition-all duration-300 ${h.status === 'Critical' ? 'border-l-4 border-l-red-500' : h.status === 'Warning' ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-[var(--ax-success)]'}`}>
            <CardContent className="p-4">
              <p className="text-xs font-bold text-[var(--ax-muted)] uppercase tracking-widest truncate">{h.name}</p>
              <h3 className="text-2xl font-extrabold text-[var(--ax-text)] mt-2 tracking-tighter">{h.score}%</h3>
              <p className="text-xs text-[var(--ax-muted)] mt-1 truncate">{h.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm">
          <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--ax-text)]">Stewardship Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--ax-border)]/50">
              {recommendations.length > 0 ? recommendations.map((rec, i) => (
                <div key={i} className="flex justify-between items-start p-4 hover:bg-[var(--ax-primary)]/5 transition-colors group">
                  <div className="flex flex-col">
                    <span className="font-bold text-[var(--ax-text)] group-hover:text-[var(--ax-primary)] transition-colors">{rec.message}</span>
                    {rec.objectId && <span className="text-xs text-[var(--ax-muted)] mt-1">{rec.objectId}</span>}
                  </div>
                  <Badge variant="outline" className={rec.priority === "High" ? "border-red-500 text-red-500" : rec.priority === "Medium" ? "border-yellow-500 text-yellow-500" : "border-[var(--ax-muted)] text-[var(--ax-muted)]"}>
                    {rec.type}
                  </Badge>
                </div>
              )) : (
                <div className="p-6 text-center text-[var(--ax-muted)] text-sm">No actionable recommendations at this time.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--ax-surface)]/50 backdrop-blur-sm border-[var(--ax-border)] shadow-sm">
          <CardHeader className="border-b border-[var(--ax-border)]/50 bg-[var(--ax-surface)]/30">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--ax-text)]">Recent Changes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--ax-border)]/50">
              {recent.map(obj => {
                const scores = computeScores(obj, objects, edges);
                return (
                <div key={obj.id} className="flex justify-between items-center p-4 hover:bg-[var(--ax-primary)]/5 transition-colors group">
                  <div className="flex flex-col">
                    <span className="font-bold text-[var(--ax-text)] group-hover:text-[var(--ax-primary)] transition-colors">{obj.id}</span>
                    <span className="text-xs text-[var(--ax-muted)] mt-1">{obj.title}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="bg-[var(--ax-background)]">{obj.type}</Badge>
                    <span className="text-[10px] text-[var(--ax-muted)] mt-1">Trust: {scores.trust}%</span>
                  </div>
                </div>
              )})}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
