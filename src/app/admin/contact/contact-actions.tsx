"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Trash } from "lucide-react";
import { toast } from "sonner";
import { markContactRead, markContactUnread, deleteContactSubmission } from "@/app/actions/contact";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";

function ContactActions({
  id,
  isRead,
  name,
}: {
  id: string;
  isRead: boolean;
  name: string;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleRead = async () => {
    setLoading(true);
    setActionType("toggle");
    try {
      if (isRead) {
        await markContactUnread(id);
        toast.success("Marked as unread");
      } else {
        await markContactRead(id);
        toast.success("Marked as read");
      }
      router.refresh();
    } catch {
      toast.error("Failed to update message status");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setActionType("delete");
    try {
      await deleteContactSubmission(id);
      toast.success("Message deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setLoading(false);
      setActionType(null);
      setShowDeleteConfirm(false);
    }
  };

  const isBusy = loading && actionType;

  return (
    <>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleRead}
          disabled={loading}
          title={isRead ? "Mark as unread" : "Mark as read"}
        >
          {isBusy && actionType === "toggle" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : isRead ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-primary" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={`Delete message from ${name}`}
        description="Are you sure you want to delete this contact submission? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

const ContactActions = memo(_ContactActions);
export { ContactActions };
