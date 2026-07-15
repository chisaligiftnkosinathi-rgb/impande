import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--ax-radius)] text-sm font-medium ring-offset-[var(--ax-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ax-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--ax-primary)] text-white hover:bg-opacity-90": variant === "default",
            "border border-[var(--ax-border)] bg-transparent hover:bg-[var(--ax-surface)] hover:text-[var(--ax-primary)]": variant === "outline",
            "hover:bg-[var(--ax-surface)] hover:text-[var(--ax-primary)]": variant === "ghost",
            "text-[var(--ax-primary)] underline-offset-4 hover:underline": variant === "link",
            "bg-[var(--ax-glass)] backdrop-blur-md border border-[var(--ax-glass-border)] text-[var(--ax-text)] hover:bg-[var(--ax-surface)]": variant === "glass",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
