export function KnowledgeGraphPreview() {
  return (
    <div className="w-full h-full min-h-[150px] bg-[var(--ax-background)] rounded-md border border-[var(--ax-border)] flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-2 text-xs font-mono text-[var(--ax-muted)]">
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Publication</div>
        <div className="h-4 border-l border-dashed border-[var(--ax-primary)]" />
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Software</div>
        <div className="h-4 border-l border-dashed border-[var(--ax-primary)]" />
        <div className="px-3 py-1 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded">Evidence</div>
      </div>
    </div>
  )
}