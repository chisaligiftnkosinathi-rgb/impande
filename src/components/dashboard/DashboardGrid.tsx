import React from "react"
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
    <Card className={`bg-[var(--ax-surface)] border-[var(--ax-border)] flex flex-col ${className}`}>
      <CardHeader className="pb-3 border-b border-[var(--ax-border)]/50">
        <CardTitle className="text-sm font-semibold tracking-wider text-[var(--ax-text)] uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        {children}
      </CardContent>
    </Card>
  )
}