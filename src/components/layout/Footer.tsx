export function Footer() {
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
}