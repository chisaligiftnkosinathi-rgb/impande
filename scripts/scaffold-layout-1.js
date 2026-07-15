const fs = require('fs');
const path = require('path');

const layoutDir = path.join(__dirname, '../src/components/layout');
if (!fs.existsSync(layoutDir)) fs.mkdirSync(layoutDir, { recursive: true });

const components = {
  'LayoutContext.tsx': `"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface LayoutContextType {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
  breadcrumbs: { label: string; href?: string }[]
  setBreadcrumbs: (v: { label: string; href?: string }[]) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href?: string }[]>([])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <LayoutContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        commandPaletteOpen,
        setCommandPaletteOpen,
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayout must be used within LayoutProvider")
  return context
}`,

  'CommandBar.tsx': `"use client"

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
}`,

  'StatusStrip.tsx': `export function StatusStrip() {
  return (
    <div className="w-full border-b border-[var(--ax-border)] bg-[var(--ax-surface)] px-4 py-1.5 flex items-center justify-between text-xs font-mono text-[var(--ax-muted)] overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex items-center space-x-6">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ax-success)] animate-pulse"></span>
          Observatory: Operational
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ax-success)]"></span>
          Repositories: Synced
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ax-success)]"></span>
          Evidence: Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ax-success)]"></span>
          Verification: Online
        </span>
      </div>
      <div className="pl-6">
        Registry: {new Date().toISOString().split('T')[0]} 00:00 UTC
      </div>
    </div>
  )
}`,

  'Header.tsx': `"use client"

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
}`,

  'Sidebar.tsx': `"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLayout } from "./LayoutContext"

const navItems = [
  { href: "/discover/data-evidence", label: "Discover" },
  { href: "/trust/verification", label: "Trust" },
  { href: "/solutions/certified-products", label: "Solutions" },
  { href: "/participate/open-science", label: "Participate" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed } = useLayout()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 border-r border-[var(--ax-border)] bg-[var(--ax-surface)] transition-transform duration-300 ease-in-out md:static md:translate-x-0",
        sidebarCollapsed ? "-translate-x-full md:w-16" : "translate-x-0"
      )}
    >
      <div className="flex h-full flex-col py-6">
        <nav className="grid gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname?.startsWith(item.href)
                  ? "bg-[var(--ax-primary)] text-white"
                  : "text-[var(--ax-muted)] hover:bg-[var(--ax-background)] hover:text-[var(--ax-text)]"
              )}
            >
              {sidebarCollapsed ? item.label.charAt(0) : item.label}
            </Link>
          ))}
        </nav>
        {!sidebarCollapsed && (
          <div className="mt-8 px-4">
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--ax-muted)]">
              Recent Objects
            </h4>
            <div className="grid gap-1 text-sm">
              <div className="px-3 py-1.5 text-[var(--ax-muted)] font-mono text-xs">No recent history</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(layoutDir, filename), content);
}

console.log('Layout primitives 1 generated.');
