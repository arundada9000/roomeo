import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  image?: string | null
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
}

function Avatar({ name, image, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  if (image) {
    return (
      <div className={cn("flex-shrink-0", className)}>
        <img
          src={image}
          alt={name}
          className={cn("rounded-full object-cover", sizeMap[size])}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 font-bold text-primary flex-shrink-0",
        sizeMap[size],
        className
      )}
    >
      {initials || "?"}
    </div>
  )
}

function AvatarGroup({
  users,
  max = 3,
  size = "sm",
}: {
  users: { name: string; image?: string | null }[]
  max?: number
  size?: "sm" | "md"
}) {
  const visible = users.slice(0, max)
  const remaining = users.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map((user) => (
        <Avatar key={user.name} name={user.name} image={user.image} size={size} />
      ))}
      {remaining > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted-foreground ring-2 ring-background">
          +{remaining}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
