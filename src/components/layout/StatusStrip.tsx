export function StatusStrip() {
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
}