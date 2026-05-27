import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import prisma from "@/lib/prisma";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminFooter } from "@/components/admin/admin-footer";
import { PageTransition } from "@/components/page-transition";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, name: true, email: true, image: true },
  });

  if (user?.role !== "ADMIN") {
    redirect("/profile");
  }

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))]">
      <AdminSidebar
        user={{ name: user.name, email: user.email }}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-auto">
          <PageTransition>{children}</PageTransition>
        </main>
        <AdminFooter />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </div>
  );
}
