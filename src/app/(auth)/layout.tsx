import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      {/* ─── Left Pane: Hero Image (Desktop only) ─── */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/auth-hero.png"
          alt="Premium apartment interior"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Branding overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
              <Image src="/logo.png" alt="Roomeo" width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
              ROOMEO
            </span>
          </div>

          {/* Bottom tagline */}
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
              Find your perfect space.
              <br />
              <span className="text-white/80">Effortlessly.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Discover premium rooms and flats near you with live map discovery, smart filters, and verified listings.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 bg-white/20 backdrop-blur-sm text-xs font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/70">
                <span className="font-bold text-white">5,000+</span> happy tenants
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Pane: Auth Form ─── */}
      <div className="flex w-full flex-1 flex-col lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
