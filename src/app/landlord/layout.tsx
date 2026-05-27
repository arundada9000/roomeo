import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import { LayoutGrid, Building2, Plus } from "lucide-react";

export default async function LandlordLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar initialSession={session} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/40 bg-card/50 p-6 hidden md:flex md:flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-3">Management</p>
          <nav className="space-y-1">
            <Link
              href="/landlord"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <LayoutGrid className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/landlord/properties"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <Building2 className="h-5 w-5" />
              My Properties
            </Link>
          </nav>

          <div className="mt-auto pt-6">
            <Link
              href="/landlord/new-property"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:scale-[0.98] active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
