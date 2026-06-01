"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { Trash, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { unsubscribeNewsletter, deleteNewsletterSubscription } from "@/app/actions/newsletter";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";

function _NewsletterActions({
  id,
  email,
  subscribed,
}: {
  id: string;
  email: string;
  subscribed: boolean;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleSubscribe = async () => {
    setLoading(true);
    setActionType("unsubscribe");
    try {
      await unsubscribeNewsletter(id);
      toast.success(`${email} unsubscribed`);
      router.refresh();
    } catch {
      toast.error("Failed to unsubscribe");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setActionType("delete");
    try {
      await deleteNewsletterSubscription(id);
      toast.success("Subscriber removed");
      router.refresh();
    } catch {
      toast.error("Failed to remove subscriber");
    } finally {
      setLoading(false);
      setActionType(null);
      setShowDeleteConfirm(false);
    }
  };

  const isBusy = loading && actionType;

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        {subscribed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleSubscribe}
            disabled={loading}
            className="text-muted-foreground hover:text-amber-600"
          >
            {isBusy && actionType === "unsubscribe" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            Unsubscribe
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
          className="text-muted-foreground hover:text-destructive"
        >
          {isBusy && actionType === "delete" && !showDeleteConfirm ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={`Remove ${email}`}
        description="Are you sure you want to delete this subscriber? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

const NewsletterActions = memo(_NewsletterActions);
export { NewsletterActions };
