import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
}

function Spinner({ className, size = "default", ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent text-[var(--ax-primary)]",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6 border-2": size === "default",
          "h-8 w-8 border-3": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner }