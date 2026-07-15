"use client"

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
}