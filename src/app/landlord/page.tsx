import Link from "next/link";
import { Plus } from "lucide-react";

export default function LandlordDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <Link
          href="/landlord/new-property"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Stats cards placeholder */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Active Units</p>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Views</p>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">Recent Properties</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-base font-medium text-foreground">No properties yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by adding your first property.
          </p>
        </div>
      </div>
    </div>
  );
}
