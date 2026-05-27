import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Home, Building2, User, Calendar, DollarSign,
  Wifi, Car, Dog, Wind, Bath, Check, ChevronLeft,
  Heart, MessageSquare, BadgeCheck, BadgeX,
} from "lucide-react";
import { StatusBadge, RoleBadge } from "@/components/admin/role-badge";
import { Badge } from "@/components/ui/badge";
import { ListingsActions } from "../listings-actions";
import { FadeIn } from "@/components/page-transition";

export default async function AdminListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const unit = await prisma.unit.findUnique({
    where: { id },
    include: {
      property: {
        include: {
          landlord: { select: { id: true, name: true, email: true, image: true, role: true } },
          reviews: { take: 5, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } },
        },
      },
      media: true,
      favorites: { take: 3, include: { user: { select: { name: true } } } },
      inquiries: { take: 5, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, email: true } } } },
      _count: { select: { favorites: true, inquiries: true } },
    },
  });

  if (!unit) notFound();

  const amenities = [
    { label: "Furnished", value: unit.furnished },
    { label: "Attached Bath", value: unit.attachedBath },
    { label: "Wi-Fi", value: unit.wifi },
    { label: "Water Included", value: unit.waterIncluded },
    { label: "Power Included", value: unit.powerIncluded },
    { label: "Parking", value: unit.parking },
    { label: "Pet Friendly", value: unit.petFriendly },
    { label: "Balcony", value: unit.balcony },
    { label: "Kitchen Access", value: unit.kitchenAccess },
  ];

  const rules = [
    { label: "Bachelor Friendly", value: unit.bachelorFriendly },
    { label: "Family Friendly", value: unit.familyFriendly },
    { label: "Boys Only", value: unit.boysOnly },
    { label: "Girls Only", value: unit.girlsOnly },
    { label: "Smoking Allowed", value: unit.smokingAllowed },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/listings"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{unit.title}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground/70">Listing #{unit.id.slice(0, 8)}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <StatusBadge status={unit.status} />
            <ListingsActions unitId={unit.id} status={unit.status} />
          </div>
        </div>
      </FadeIn>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left - Media & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Media Gallery */}
          <FadeIn delay={0.05}>
            <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
              {unit.media.length > 0 ? (
                <div className="grid grid-cols-2 gap-1">
                  {unit.media.slice(0, 4).map((m, i) => (
                    <div key={m.id} className={`relative aspect-[4/3] overflow-hidden ${i === 0 ? "col-span-2" : ""}`}>
                      <img src={m.url} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center bg-secondary/30 text-muted-foreground">
                  <Home className="h-12 w-12 opacity-30" />
                </div>
              )}
              {unit.media.length > 4 && (
                <div className="border-t border-border/30 px-4 py-2 text-xs text-muted-foreground/60">
                  +{unit.media.length - 4} more images
                </div>
              )}
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h2 className="mb-3 text-base font-bold text-foreground">Description</h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground/80">
                {unit.description || unit.property.description || "No description."}
              </p>
            </div>
          </FadeIn>

          {/* Amenities */}
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-foreground">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-2 text-sm">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${a.value ? "bg-green-500/10 text-green-600" : "bg-secondary/50 text-muted-foreground/40"}`}>
                      {a.value ? <Check className="h-3.5 w-3.5" /> : <BadgeX className="h-3.5 w-3.5" />}
                    </div>
                    <span className={a.value ? "text-foreground" : "text-muted-foreground/50"}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Rules */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-foreground">House Rules</h2>
              <div className="flex flex-wrap gap-2">
                {rules
                  .filter((r) => r.value)
                  .map((r) => (
                    <Badge key={r.label} variant="secondary">{r.label}</Badge>
                  ))}
                {rules.filter((r) => r.value).length === 0 && (
                  <span className="text-sm text-muted-foreground/50">No rules specified</span>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Inquiries */}
          <FadeIn delay={0.25}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Inquiries ({unit._count.inquiries})
              </h2>
              {unit.inquiries.length > 0 ? (
                <div className="space-y-3">
                  {unit.inquiries.map((inq) => (
                    <div key={inq.id} className="rounded-xl border border-border/30 bg-secondary/20 p-4 text-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-foreground">{inq.user.name}</span>
                        <Badge variant={inq.status === "OPEN" ? "warning" : "secondary"} size="sm">
                          {inq.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground/70">{inq.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground/40">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground/50">No inquiries yet.</p>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Price & Status */}
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-2xl font-extrabold text-foreground tracking-tight">
                <DollarSign className="h-6 w-6 text-muted-foreground/40" />
                Rs. {unit.price.toLocaleString("en-IN")}
                <span className="text-sm font-medium text-muted-foreground/60">/mo</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-muted-foreground/40" />
                <span className="text-muted-foreground/60">{unit.type.replace(/_/g, " ")}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground/40" />
                <span className="text-muted-foreground/60">
                  Available {unit.availableFrom ? new Date(unit.availableFrom).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Now"}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Property */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">Property</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <span className="font-medium text-foreground">{unit.property.title}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <span className="text-muted-foreground/70">{unit.property.address}, {unit.property.city}, {unit.property.state}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/30 px-3 py-2 text-xs text-muted-foreground/60">
                <BadgeCheck className="h-3 w-3" />
                {unit.property.zipCode ?? "No zip"}
              </div>
            </div>
          </FadeIn>

          {/* Landlord */}
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">Listed by</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {unit.property.landlord.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{unit.property.landlord.name}</p>
                  <p className="text-xs text-muted-foreground/60 truncate">{unit.property.landlord.email}</p>
                </div>
                <div className="ml-auto">
                  <RoleBadge role={unit.property.landlord.role} />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Engagement */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">Engagement</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-foreground">
                    <Heart className="h-4 w-4 text-red-500" />
                    {unit._count.favorites}
                  </div>
                  <p className="text-xs text-muted-foreground/50 mt-0.5">Favorites</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-foreground">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    {unit._count.inquiries}
                  </div>
                  <p className="text-xs text-muted-foreground/50 mt-0.5">Inquiries</p>
                </div>
              </div>
              {unit.favorites.length > 0 && (
                <div className="mt-3 border-t border-border/20 pt-3">
                  <p className="text-xs text-muted-foreground/50 mb-1.5">Saved by:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {unit.favorites.map((f) => (
                      <Badge key={f.id} variant="secondary" size="sm">{f.user.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Reviews */}
          {unit.property.reviews.length > 0 && (
            <FadeIn delay={0.25}>
              <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">Reviews</h3>
                <div className="space-y-3">
                  {unit.property.reviews.map((r) => (
                    <div key={r.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{r.user.name}</span>
                        <span className="text-yellow-500 text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                      </div>
                      {r.comment && <p className="mt-0.5 text-muted-foreground/70">{r.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
