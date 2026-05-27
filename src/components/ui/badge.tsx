import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-muted-foreground",
        destructive: "bg-destructive/10 text-destructive",
        success: "bg-green-500/10 text-green-600 dark:text-green-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        outline: "border border-border text-muted-foreground",
        admin: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        landlord: "bg-primary/10 text-primary",
        user: "bg-secondary text-muted-foreground",
        pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        approved: "bg-green-500/10 text-green-600 dark:text-green-400",
        rejected: "bg-destructive/10 text-destructive",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
