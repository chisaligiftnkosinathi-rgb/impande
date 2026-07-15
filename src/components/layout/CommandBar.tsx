"use client"

import * as React from "react"
import { useLayout } from "./LayoutContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function CommandBar() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useLayout()

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent className="max-w-2xl gap-0 p-0 shadow-[var(--ax-shadow-glass)]">
        <div className="flex items-center border-b border-[var(--ax-border)] px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-[var(--ax-muted)]" />
          <Input
            placeholder="Search Intelligence System..."
            className="flex h-12 w-full rounded-none border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 placeholder:text-[var(--ax-muted)]"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          <div className="px-2 py-4 text-center text-sm text-[var(--ax-muted)]">
            No active registry connection. Try navigating via sidebar.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}