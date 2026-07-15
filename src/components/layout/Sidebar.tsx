"use client"

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
}