"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Edit, Trash, Shield, UserCog, ShieldCheck, Star } from "lucide-react";
import { toast } from "sonner";
import { updateUserRole, deleteUser } from "../actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

function _UsersRoleActions({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [showActions, setShowActions] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleChange = async (role: "ADMIN" | "LANDLORD" | "USER") => {
    if (role === currentRole) return;
    setLoading(true);
    setLoadingAction(`role-${role}`);
    try {
      await updateUserRole(userId, role);
      toast.success(`Role updated to ${role}`);
      router.refresh();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
      setLoadingAction(null);
      setShowRoleMenu(false);
      setShowActions(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setLoadingAction("delete");
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      setLoadingAction(null);
      setShowDeleteConfirm(false);
    }
  };

  const roleIcon = (role: string) => {
    switch (role) {
      case "ADMIN": return <ShieldCheck className="h-3.5 w-3.5" />;
      case "LANDLORD": return <Star className="h-3.5 w-3.5" />;
      default: return <UserCog className="h-3.5 w-3.5" />;
    }
  };

  return (
    <>
      <div className="relative inline-flex">
        <button
          onClick={() => setShowActions(!showActions)}
          disabled={loading}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
          aria-label="Actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {showActions && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => { setShowActions(false); setShowRoleMenu(false); }}
            />
            <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-border bg-card py-1 shadow-lg">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                disabled={loading}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
              >
                <Shield className="h-4 w-4 text-muted-foreground" />
                Change Role
              </button>

              {showRoleMenu && (
                <div className="border-t border-border/40 py-1">
                  {["ADMIN", "LANDLORD", "USER"].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role as "ADMIN" | "LANDLORD" | "USER")}
                      disabled={loading || role === currentRole}
                      className={`flex w-full items-center gap-2 px-8 py-1.5 text-left text-xs transition-colors ${
                        role === currentRole
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      } disabled:opacity-50`}
                    >
                      {loadingAction === `role-${role}` ? (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        roleIcon(role)
                      )}
                      {role}
                      {role === currentRole && " (current)"}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => router.push(`/admin/users/${userId}`)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary"
              >
                <Edit className="h-4 w-4 text-muted-foreground" />
                Edit User
              </button>

              <div className="border-t border-border/40" />

              <button
                onClick={() => { setShowDeleteConfirm(true); setShowActions(false); }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <Trash className="h-4 w-4" />
                Delete User
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone. All associated data will be removed."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

const UsersRoleActions = memo(_UsersRoleActions);
export { UsersRoleActions };
