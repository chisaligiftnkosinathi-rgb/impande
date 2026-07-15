"use client"

import { useLayout } from "./LayoutContext"
import { cn } from "@/lib/utils"

export function MainContent({ children }: { children: React.ReactNode }) {
  // Layout context can be accessed here if needed in the future

  return (
    <main
      className={cn(
        "flex-1 flex flex-col min-h-[calc(100vh-3.5rem)] transition-all duration-300 w-full"
      )}
    >
      <div className="flex-1 w-full max-w-[var(--ax-container)] mx-auto p-4 md:p-8">
        {children}
      </div>
    </main>
  )
}