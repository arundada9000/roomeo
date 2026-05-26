import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Wifi, Car, Dog, Wind, Bath, Check, Home, Contact } from "lucide-react";
import Navbar from "@/components/shared/navbar";

export default async function UnitDetailPage({ params }: { params: { id: string } }) {
  const unit = await prisma.unit.findUnique({
    where: { id: params.id },
    include: {
      property: {
        include: {
          landlord: true,
        }
      },
      media: true,
    },
  });

  if (!unit) {
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Image Gallery Header */}
        <div className="w-full bg-secondary relative overflow-hidden">
          <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[40vh] md:h-[50vh]">
            {unit.media && unit.media.length > 0 ? (
              unit.media.map((img, i) => (
                <div key={img.id} className="min-w-full flex-shrink-0 snap-center relative border-r border-background/20 bg-muted flex items-center justify-center">
                  <img src={img.url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              [1, 2, 3].map((img) => (
                <div key={img} className="min-w-full flex-shrink-0 snap-center relative border-r border-background/20 bg-muted flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <p className="text-muted-foreground flex flex-col items-center gap-2 z-10">
                    <Home className="h-12 w-12 opacity-30" />
                    <span>Photo {img} (Placeholder)</span>
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {unit.media && unit.media.length > 0 ? (
              unit.media.map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/30 shadow-sm'}`} />
              ))
            ) : (
              [1, 2, 3].map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/30'}`} />
              ))
            )}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {formatType(unit.type)}
                  </span>
                  {unit.isAvailable ? (
                    <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                      Available Now
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
                      Rented
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {unit.title}
                </h1>
                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-base">{unit.property.address}, {unit.property.city}, {unit.property.state}</span>
                </div>
              </div>

              <hr className="border-border" />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">About this property</h2>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {unit.description || unit.property.description || "No description provided."}
                </p>
              </div>

              <hr className="border-border" />

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map(amenity => (
                    <div key={amenity.key} className="flex items-center gap-3 text-muted-foreground">
                      <amenity.icon className="h-5 w-5" />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                  {amenities.length === 0 && <span className="text-muted-foreground">No specific amenities listed.</span>}
                </div>
              </div>

              <hr className="border-border" />

              {/* Rules & Preferences */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">House Rules & Preferences</h2>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  {rules.map((rule, idx) => (
                    <li key={idx}>{rule.label}</li>
                  ))}
                  {rules.length === 0 && <li>No specific house rules listed.</li>}
                </ul>
              </div>

            </div>

            {/* Right Sidebar - Pricing & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">Rs. {unit.price.toLocaleString()}</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Water Included</span>
                    <span className="font-medium text-foreground">{unit.waterIncluded ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Power Included</span>
                    <span className="font-medium text-foreground">{unit.powerIncluded ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                <button 
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Contact className="h-5 w-5" />
                  Contact Landlord
                </button>

                <div className="mt-6 border-t border-border pt-6 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Listed By</p>
                  <p className="font-medium text-foreground">{unit.property.landlord.name}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
