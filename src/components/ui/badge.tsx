import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "glass"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ax-primary)] focus:ring-offset-2",
        {
          "border-transparent bg-[var(--ax-primary)] text-white shadow hover:bg-opacity-80": variant === "default",
          "border-transparent bg-[var(--ax-surface)] text-[var(--ax-text)] hover:bg-opacity-80": variant === "secondary",
          "text-[var(--ax-text)] border-[var(--ax-border)]": variant === "outline",
          "border-transparent bg-[var(--ax-success)] text-white": variant === "success",
          "border-transparent bg-[var(--ax-warning)] text-white": variant === "warning",
          "border-transparent bg-[var(--ax-error)] text-white": variant === "error",
          "border-[var(--ax-glass-border)] bg-[var(--ax-glass)] backdrop-blur-sm text-[var(--ax-text)]": variant === "glass",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
