"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { approveUnit, rejectUnit, deleteUnit } from "../actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";

function ListingsActions({
  unitId,
  status,
}: {
  unitId: string;
  status: string;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const router = useRouter();

  const handleApprove = async () => {
    setLoading(true);
    setActionType("approve");
    try {
      await approveUnit(unitId);
      toast.success("Listing approved");
      router.refresh();
    } catch {
      toast.error("Failed to approve listing");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setActionType("reject");
    try {
      await rejectUnit(unitId);
      toast.success("Listing rejected");
      router.refresh();
    } catch {
      toast.error("Failed to reject listing");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setActionType("delete");
    try {
      await deleteUnit(unitId);
      toast.success("Listing deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete listing");
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
        {status === "PENDING" && (
          <>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleApprove}
              disabled={loading}
            >
              {isBusy && actionType === "approve" ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <CheckCircle className="h-3.5 w-3.5" />
              )}
              {actionType === "approve" ? "Approving..." : "Approve"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/30 text-red-600 hover:bg-red-500/10"
              onClick={handleReject}
              disabled={loading}
            >
              {isBusy && actionType === "reject" ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              ) : (
                <XCircle className="h-3.5 w-3.5" />
              )}
              {actionType === "reject" ? "Rejecting..." : "Reject"}
            </Button>
          </>
        )}
        {status !== "PENDING" && (
          <>
            {status === "REJECTED" && (
              <Button
                size="sm"
                variant="ghost"
                className="text-green-600"
                onClick={handleApprove}
                disabled={loading}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>
            )}
            {status === "APPROVED" && (
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500"
                onClick={handleReject}
                disabled={loading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </Button>
            )}
          </>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Listing"
        description="Are you sure you want to delete this listing? This action cannot be undone."
        confirmLabel="Delete Listing"
        variant="destructive"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

const ListingsActions = memo(_ListingsActions);
export { ListingsActions };
