"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useLayout } from "./LayoutContext"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { searchRegistryAction } from "@/app/actions"
import { BaseKnowledgeObject } from "@/lib/registry/types"
import { getObjectIcon } from "@/lib/presentation/helpers"
import * as Icons from "lucide-react"

export function CommandBar() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useLayout()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<BaseKnowledgeObject[]>([])
  const router = useRouter()

  React.useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    const fetchResults = async () => {
      const data = await searchRegistryAction(query)
      setResults(data)
    }
    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (id: string) => {
    setCommandPaletteOpen(false)
    setQuery("")
    setResults([])
    router.push(\`/objects/\${id}\`)
  }

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent className="max-w-2xl gap-0 p-0 shadow-[var(--ax-shadow-glass)] bg-[var(--ax-background)] border-[var(--ax-border)]">
        <div className="flex items-center border-b border-[var(--ax-border)] px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-[var(--ax-muted)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Intelligence System..."
            className="flex h-12 w-full rounded-none border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 placeholder:text-[var(--ax-muted)]"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="flex flex-col gap-1">
              {results.map((obj) => {
                const iconName = getObjectIcon(obj.type)
                const IconComponent = (Icons as any)[iconName] || Icons.Box
                return (
                  <button
                    key={obj.id}
                    onClick={() => handleSelect(obj.id)}
                    className="flex items-center w-full px-2 py-3 rounded hover:bg-[var(--ax-surface)] hover:text-[var(--ax-primary)] transition-colors text-left"
                  >
                    <IconComponent className="h-4 w-4 mr-3 text-[var(--ax-muted)]" />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-medium text-[var(--ax-text)]">{obj.title}</span>
                        <span className="text-xs font-mono text-[var(--ax-muted)]">{obj.id}</span>
                      </div>
                      <span className="text-xs text-[var(--ax-muted)] mt-0.5">{obj.type}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : query ? (
            <div className="px-2 py-4 text-center text-sm text-[var(--ax-muted)]">
              No results found for "{query}"
            </div>
          ) : (
            <div className="px-2 py-4 text-center text-sm text-[var(--ax-muted)]">
              Begin typing to query the AXIONYX Registry.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}