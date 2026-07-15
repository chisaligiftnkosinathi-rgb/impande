import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface KnowledgeObjectCardProps {
  id: string
  title: string
  type: "Publication" | "Software" | "Dataset" | "Standard" | "Product"
  repository: string
  status: "Verified" | "Pending" | "Deprecated"
  evidenceCount: number
  lastUpdated: string
}

export function KnowledgeObjectCard({
  id,
  title,
  type,
  repository,
  status,
  evidenceCount,
  lastUpdated,
}: KnowledgeObjectCardProps) {
  return (
    <Card className="hover:shadow-[var(--ax-shadow-elevated)] transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <span className="text-[var(--ax-muted)] text-xs font-mono">{id}</span>
          <CardTitle className="text-lg mt-1">{title}</CardTitle>
        </div>
        <Badge
          variant={
            status === "Verified"
              ? "success"
              : status === "Pending"
              ? "warning"
              : "error"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {type} stored in <span className="font-mono text-[var(--ax-text)]">{repository}</span>
        </CardDescription>
        <div className="flex gap-2">
          <Badge variant="secondary">{evidenceCount} Evidence Packages</Badge>
          <Badge variant="outline">Updated {lastUpdated}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
