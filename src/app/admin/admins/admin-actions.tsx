"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { UserCog } from "lucide-react";
import { toast } from "sonner";
import { updateUserRole } from "../actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";

function _AdminActions({
  adminId,
  adminName,
}: {
  adminId: string;
  adminName: string;
}) {
  const [showDemoteConfirm, setShowDemoteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDemote = async () => {
    setLoading(true);
    try {
      await updateUserRole(adminId, "USER");
      toast.success(`${adminName} demoted to User`);
      router.refresh();
    } catch {
      toast.error("Failed to demote admin");
    } finally {
      setLoading(false);
      setShowDemoteConfirm(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-amber-600 border-amber-500/30 hover:bg-amber-500/10"
          onClick={() => setShowDemoteConfirm(true)}
          disabled={loading}
        >
          <UserCog className="h-3.5 w-3.5" />
          Demote to User
        </Button>
      </div>

      <ConfirmDialog
        open={showDemoteConfirm}
        onOpenChange={setShowDemoteConfirm}
        title={`Demote ${adminName}`}
        description={`Are you sure you want to demote ${adminName} from Admin to User? They will lose access to all admin features.`}
        confirmLabel="Demote to User"
        variant="destructive"
        onConfirm={handleDemote}
        loading={loading}
      />
    </>
  );
}

const AdminActions = memo(_AdminActions);
export { AdminActions };
