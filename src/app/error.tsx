'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global UI Error Caught:", error)
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center p-6 bg-[var(--ax-background)]">
      <Card className="max-w-md w-full border-red-900/50 bg-red-950/10">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[var(--ax-text)]">Something went wrong!</h2>
            <p className="text-sm text-[var(--ax-muted)]">
              The Observatory encountered an unexpected error while rendering this page.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-[var(--ax-surface)] hover:bg-[var(--ax-primary)]/20 text-[var(--ax-text)] rounded-md border border-[var(--ax-border)] transition-colors text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
