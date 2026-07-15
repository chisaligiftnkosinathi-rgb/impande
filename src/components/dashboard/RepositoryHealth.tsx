export function RepositoryHealth() {
  const checks = [
    { label: "Registry", status: "Healthy" },
    { label: "Graph", status: "Connected" },
    { label: "Evidence", status: "Available" },
    { label: "Search Index", status: "Ready" },
    { label: "Verification", status: "Online" },
  ]

  return (
    <div className="space-y-3">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center justify-between text-sm">
          <span className="text-[var(--ax-muted)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--ax-success)]" />
            {check.label}
          </span>
          <span className="text-[var(--ax-text)] font-mono text-xs border-b border-dotted border-[var(--ax-border)] pb-0.5">
            {check.status}
          </span>
        </div>
      ))}
    </div>
  )
}