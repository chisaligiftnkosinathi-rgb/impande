"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  
  if (!pathname || pathname === "/") return null

  const paths = pathname.split("/").filter(Boolean)

  return (
    <nav className="flex items-center space-x-1 text-sm text-[var(--ax-muted)] mb-6">
      <Link href="/" className="hover:text-[var(--ax-primary)] transition-colors">Observatory</Link>
      {paths.map((path, i) => {
        const href = `/${paths.slice(0, i + 1).join("/")}`
        const isLast = i === paths.length - 1
        // Format path: remove dashes and capitalize
        const label = path.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

        return (
          <div key={path} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-[var(--ax-text)] font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-[var(--ax-primary)] transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}