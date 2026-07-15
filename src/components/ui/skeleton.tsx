import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-[var(--ax-radius-md)] bg-[var(--ax-border)] opacity-50", className)}
      {...props}
    />
  )
}

export { Skeleton }