import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Wifi, Car, Dog, Wind, Bath, Check, Home, Phone, ChevronLeft, Navigation } from "lucide-react";
import FavoriteButton from "@/components/shared/favorite-button";
import ShareClientButton from "@/components/shared/share-client-button";
import type { UnitCard } from "@/types";

export default async function UnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const unit = await prisma.unit.findUnique({
    where: { id: resolvedParams.id },
    include: {
      property: {
        include: {
          landlord: true,
        }
      },
      media: true,
    },
  });

  if (!unit || unit.status !== "APPROVED") {
    notFound();
  }

  // Formatting utilities
  const formatType = (type: string) => type.replace('_', ' ');

  const amenities = [
    { key: 'furnished', label: 'Furnished', icon: Home, value: unit.furnished },
    { key: 'attachedBath', label: 'Attached Bath', icon: Bath, value: unit.attachedBath },
    { key: 'wifi', label: 'Wi-Fi Included', icon: Wifi, value: unit.wifi },
    { key: 'parking', label: 'Parking Space', icon: Car, value: unit.parking },
    { key: 'petFriendly', label: 'Pet Friendly', icon: Dog, value: unit.petFriendly },
    { key: 'balcony', label: 'Balcony', icon: Wind, value: unit.balcony },
    { key: 'kitchenAccess', label: 'Kitchen Access', icon: Check, value: unit.kitchenAccess },
  ].filter(a => a.value);

  const rules = [
    { label: 'Bachelor Friendly', value: unit.bachelorFriendly },
    { label: 'Family Friendly', value: unit.familyFriendly },
    { label: 'Boys Only', value: unit.boysOnly },
    { label: 'Girls Only', value: unit.girlsOnly },
    { label: 'Smoking Allowed', value: unit.smokingAllowed },
  ].filter(r => r.value);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: unit.currency || "INR",
    minimumFractionDigits: 0,
  }).format(unit.price);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 md:pb-0">
      <main className="flex-1 w-full max-w-5xl mx-auto md:px-4 md:py-6">
        
        {/* Desktop Header Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-between mb-6">
           <Link href="/explore" className="flex items-center gap-2 text-primary hover:underline font-medium">
             <ChevronLeft className="h-5 w-5" /> Back to Explore
           </Link>
           <div className="flex gap-3">
             <ShareClientButton url={`/units/${unit.id}`} title={unit.title} />
             <FavoriteButton unit={unit as unknown as UnitCard} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium border-0 bg-transparent px-0 rounded-none shadow-none" />
           </div>
        </div>

        {/* Image Gallery Header */}
        <div className="w-full relative overflow-hidden md:rounded-3xl bg-surface-dim">
          {/* Mobile Back Button & Actions overlay */}
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center md:hidden">
             <Link href="/explore" className="h-10 w-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md text-foreground">
               <ChevronLeft className="h-6 w-6" />
             </Link>
             <div className="flex gap-2">
               <ShareClientButton url={`/units/${unit.id}`} title={unit.title} isMobile />
               <FavoriteButton unit={unit as unknown as UnitCard} className="h-10 w-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md text-foreground" />
             </div>
          </div>

          <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[45vh] md:h-[60vh]">
            {unit.media && unit.media.length > 0 ? (
              unit.media.map((img, i) => (
                <div key={img.id} className="min-w-full flex-shrink-0 snap-center relative flex items-center justify-center bg-black/5">
                  <img src={img.url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              ))
            ) : (
              [1, 2, 3].map((img) => (
                <div key={img} className="min-w-full flex-shrink-0 snap-center relative bg-surface-dim flex items-center justify-center">
                  <Home className="h-16 w-16 text-muted-foreground/30" />
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {unit.media && unit.media.length > 0 ? (
              unit.media.map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
              ))
            ) : (
              [1, 2, 3].map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-6 px-4 md:px-0">
          {/* Left Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground uppercase tracking-wider">
                  {formatType(unit.type)}
                </span>
                {unit.isAvailable ? (
                  <span className="rounded-md bg-[#d2f4d6] px-2 py-1 text-xs font-semibold text-[#0d5916] uppercase tracking-wider">
                    Available
                  </span>
                ) : (
                  <span className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive uppercase tracking-wider">
                    Occupied
                  </span>
                )}
              </div>
              <h1 className="text-[32px] md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">
                {unit.title}
              </h1>
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-base">{unit.property.address}, {unit.property.city}, {unit.property.state}</span>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${unit.property.lat},${unit.property.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary hover:underline"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
            </div>

            <div className="h-px w-full bg-border/40" />

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">About this space</h2>
              <p className="whitespace-pre-line text-muted-foreground/90 leading-relaxed text-[15px]">
                {unit.description || unit.property.description || "No description provided."}
              </p>
            </div>

            {/* Amenities Pills */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2.5">
                {amenities.map(amenity => (
                  <div key={amenity.key} className="flex items-center gap-2 rounded-full border border-border bg-surface-dim/30 px-4 py-2 text-sm font-medium text-foreground">
                    <amenity.icon className="h-4 w-4 text-primary" />
                    <span>{amenity.label}</span>
                  </div>
                ))}
                {amenities.length === 0 && <span className="text-muted-foreground">No specific amenities listed.</span>}
              </div>
            </div>

            <div className="h-px w-full bg-border/40" />

            {/* Rules & Preferences */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">House Rules</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[15px] text-muted-foreground">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                     {rule.label}
                  </li>
                ))}
                {rules.length === 0 && <li>No specific house rules listed.</li>}
              </ul>
            </div>

            <div className="h-px w-full bg-border/40 md:hidden" />

          </div>

          {/* Right Sidebar - Pricing & Contact (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-black/5">
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground tracking-tight">{formattedPrice}</span>
                <span className="text-muted-foreground font-medium"> / mo</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Water Included</span>
                  <span className="font-semibold text-foreground">{unit.waterIncluded ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Power Included</span>
                  <span className="font-semibold text-foreground">{unit.powerIncluded ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <button 
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[0.98] shadow-md shadow-primary/20 mb-3"
              >
                <Phone className="h-5 w-5" />
                Contact Landlord
              </button>

              <Link
                href={`/explore?selected=${unit.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-border/60 py-3.5 text-base font-bold text-foreground transition-all hover:bg-secondary active:scale-95"
              >
                <Navigation className="h-5 w-5" />
                View on Map
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${unit.property.lat},${unit.property.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-border/60 py-3.5 text-base font-bold text-foreground transition-all hover:bg-secondary active:scale-95"
              >
                <Navigation className="h-5 w-5" />
                Show Path on Map
              </a>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Listed By</p>
                <p className="font-bold text-foreground">{unit.property.landlord.name}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Action Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-background p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe">
         <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
            <div>
               <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
               <p className="text-xl font-bold text-foreground tracking-tight">{formattedPrice} <span className="text-sm font-medium text-muted-foreground">/mo</span></p>
            </div>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[15px] font-bold text-primary-foreground shadow-md shadow-primary/20 active:scale-95 transition-transform">
               <Phone className="h-5 w-5" />
               Contact
            </button>
         </div>
      </div>
    </div>
  );
}

