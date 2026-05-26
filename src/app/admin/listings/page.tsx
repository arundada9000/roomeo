import prisma from "@/lib/prisma";
import { approveUnit, rejectUnit } from "../actions";
import { CheckCircle, XCircle, Clock, MapPin } from "lucide-react";

export default async function AdminListingsPage() {
  const units = await prisma.unit.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: {
        include: { landlord: { select: { name: true, email: true } } },
      },
    },
  });

  const pending = units.filter((u) => u.status === "PENDING");
  const approved = units.filter((u) => u.status === "APPROVED");
  const rejected = units.filter((u) => u.status === "REJECTED");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Listings Moderation
        </h1>
        <p className="mt-1 text-muted-foreground">
          Approve or reject unit listings submitted by landlords.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 rounded-xl border border-border bg-card px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-medium text-foreground">{pending.length} Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-foreground">{approved.length} Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-foreground">{rejected.length} Rejected</span>
        </div>
      </div>

      {/* Pending Section */}
      {pending.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-amber-600 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Approval ({pending.length})
          </h2>
          <div className="grid gap-4">
            {pending.map((unit) => (
              <div
                key={unit.id}
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{unit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {unit.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{unit.property.address}, {unit.property.city}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      By {unit.property.landlord.name} ({unit.property.landlord.email})
                    </p>
                    <p className="mt-2 text-lg font-bold text-foreground">
                      Rs. {unit.price.toLocaleString()}/mo
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <form action={approveUnit.bind(null, unit.id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </button>
                    </form>
                    <form action={rejectUnit.bind(null, unit.id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Listings Table */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">All Listings</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {units.map((unit) => (
                  <tr key={unit.id} className="transition-colors hover:bg-secondary/20">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">{unit.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{unit.property.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{unit.type.replace("_", " ")}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground font-medium">Rs. {unit.price.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        unit.status === "APPROVED"
                          ? "bg-green-500/10 text-green-600"
                          : unit.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-red-500/10 text-red-600"
                      }`}>
                        {unit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
