import React from 'react'

export default function Loading() {
  return (
    <div className="w-full h-full p-8 animate-in fade-in duration-500 space-y-8">
      <div className="h-10 w-1/3 bg-[var(--ax-surface)] animate-pulse rounded-md border border-[var(--ax-border)]" />
      <div className="h-4 w-1/4 bg-[var(--ax-surface)] animate-pulse rounded-md" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-[var(--ax-surface)] animate-pulse rounded-xl border border-[var(--ax-border)]" />
        ))}
      </div>
      
      <div className="h-64 w-full bg-[var(--ax-surface)] animate-pulse rounded-xl border border-[var(--ax-border)] mt-8" />
    </div>
  )
}
