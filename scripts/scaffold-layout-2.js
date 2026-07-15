const fs = require('fs');
const path = require('path');

const layoutDir = path.join(__dirname, '../src/components/layout');

const components = {
  'Breadcrumbs.tsx': `"use client"

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
        const href = \`/\${paths.slice(0, i + 1).join("/")}\`
        const isLast = i === paths.length - 1
        // Format path: remove dashes and capitalize
        const label = path.replace(/-/g, " ").replace(/\\b\\w/g, l => l.toUpperCase())

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
}`,

  'Footer.tsx': `export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--ax-border)] bg-[var(--ax-surface)] py-6 px-4 md:px-8 mt-auto">
      <div className="mx-auto max-w-[var(--ax-container)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-[var(--ax-muted)]">
          Operated by: Global IT and Business Solutions (Pty) Ltd | South Africa
        </div>
        <div className="text-sm text-[var(--ax-muted)]">
          Contact: Global_IT_Business@proton.me
        </div>
      </div>
    </footer>
  )
}`,

  'MainContent.tsx': `"use client"

import { useLayout } from "./LayoutContext"
import { cn } from "@/lib/utils"

export function MainContent({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useLayout()

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
}`,

  'AppShell.tsx': `"use client"

import { LayoutProvider } from "./LayoutContext"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { CommandBar } from "./CommandBar"
import { StatusStrip } from "./StatusStrip"
import { Footer } from "./Footer"
import { MainContent } from "./MainContent"
import { Breadcrumbs } from "./Breadcrumbs"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <div className="flex min-h-screen flex-col bg-[var(--ax-background)]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto flex flex-col relative">
            <MainContent>
              <Breadcrumbs />
              {children}
            </MainContent>
            <Footer />
          </div>
        </div>
        <StatusStrip />
        <CommandBar />
      </div>
    </LayoutProvider>
  )
}`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(layoutDir, filename), content);
}

console.log('Layout primitives 2 generated.');
