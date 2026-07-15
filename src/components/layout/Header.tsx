"use client"

import Link from "next/link"
import { useLayout } from "./LayoutContext"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"

export function Header() {
  const { setCommandPaletteOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--ax-border)] bg-[var(--ax-glass)] backdrop-blur-md">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu className="h-5 w-5 text-[var(--ax-text)]" />
        </Button>

        <div className="flex items-center gap-2 font-bold tracking-tight text-[var(--ax-text)]">
          <Link href="/">AXIONYX <span className="font-light">Observatory</span></Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="outline"
            className="w-full justify-start text-sm text-[var(--ax-muted)] sm:pr-12 md:w-64"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border border-[var(--ax-border)] bg-[var(--ax-background)] px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-[var(--ax-muted)]">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}