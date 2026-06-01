"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { updateUserRole, deleteUser, updateUser } from "../../actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function _UserDetailActions({
  userId,
  currentRole,
  userName,
}: {
  userId: string;
  currentRole: string;
  userName: string;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);

  const [editName, setEditName] = useState(userName);
  const [editRole, setEditRole] = useState(currentRole);

  const router = useRouter();

  const handleEdit = async () => {
    setLoading(true);
    setActionType("edit");
    try {
      await updateUser(userId, {
        name: editName,
        role: editRole as "ADMIN" | "LANDLORD" | "USER",
      });
      toast.success("User updated successfully");
      router.refresh();
      setShowEdit(false);
    } catch {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setActionType("delete");
    try {
      await deleteUser(userId);
      toast.success("User deleted");
      router.push("/admin/users");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditName(userName);
            setEditRole(currentRole);
            setShowEdit(true);
          }}
          disabled={loading}
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
        >
          <Trash className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                disabled={loading}
              >
                <option value="USER">User</option>
                <option value="LANDLORD">Landlord</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowEdit(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={loading}>
              {loading && actionType === "edit" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-1.5" />
              ) : null}
              {loading && actionType === "edit" ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={`Delete ${userName}`}
        description="Are you sure you want to delete this user? This action cannot be undone. All properties, reviews, and associated data will also be removed."
        confirmLabel="Delete User"
        variant="destructive"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

const UserDetailActions = memo(_UserDetailActions);
export { UserDetailActions };
