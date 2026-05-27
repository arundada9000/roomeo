import { Badge } from "@/components/ui/badge"

function RoleBadge({ role }: { role: string }) {
  const variant =
    role === "ADMIN"
      ? "admin"
      : role === "LANDLORD"
      ? "landlord"
      : "user"

  return <Badge variant={variant}>{role}</Badge>
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "APPROVED"
      ? "approved"
      : status === "PENDING"
      ? "pending"
      : "rejected"

  return <Badge variant={variant}>{status}</Badge>
}

export { RoleBadge, StatusBadge }
