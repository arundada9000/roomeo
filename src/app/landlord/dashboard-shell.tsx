"use client";

import Link from "next/link";
import { Plus, Building2, Layers, Eye, ArrowRight, TrendingUp, Home } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

interface PropertySummary {
  id: string;
  title: string;
  address: string;
  city: string;
  unitCount: number;
}

export default function DashboardShell({
  totalProperties,
  totalUnits,
  activeUnits,
  properties,
}: {
  totalProperties: number;
  totalUnits: number;
  activeUnits: number;
  properties: PropertySummary[];
}) {
  const statsCards = [
    { label: "Total Properties", value: String(totalProperties), icon: Building2, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", trend: `${totalProperties > 0 ? "+" : ""}${totalProperties} total` },
    { label: "Active Units", value: String(activeUnits), icon: Layers, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", trend: `${activeUnits} available now` },
    { label: "Total Units", value: String(totalUnits), icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", trend: `${totalUnits} across all properties` },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl mb-2">Dashboard</h1>
          <p className="text-base text-muted-foreground">Manage your properties, track views, and grow your portfolio.</p>
        </div>
        <Link
          href="/landlord/new-property"
          className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeIn}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`group relative overflow-hidden rounded-3xl border ${stat.border} bg-card p-6 shadow-sm transition-shadow hover:shadow-lg`}
          >
            <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${stat.bg} opacity-0 blur-2xl transition-opacity group-hover:opacity-100 pointer-events-none`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-muted-foreground">
                  {stat.label}
                </span>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-5xl font-black text-foreground tracking-tight">{stat.value}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full mb-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Properties Section */}
      <motion.div variants={fadeIn} className="rounded-[2.5rem] border border-border/40 bg-card p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-3">
              <Home className="h-6 w-6 text-primary" />
              Recent Properties
            </h2>
            <Link href="/landlord/properties" className="group flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary/80">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/landlord/properties/${property.id}`}
                  className="group block rounded-2xl border border-border/60 bg-secondary/20 p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{property.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{property.address}, {property.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      {property.unitCount} {property.unitCount === 1 ? "unit" : "units"}
                    </span>
                    <span className="font-medium text-primary group-hover:underline text-xs">Manage &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-border/60 bg-secondary/20">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10 mb-6"
              >
                <Building2 className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="text-xl font-black text-foreground mb-2">No properties yet</h3>
              <p className="text-base text-muted-foreground max-w-sm mb-8 leading-relaxed">
                You haven&apos;t added any properties to your portfolio. Get started by adding your first building or flat.
              </p>
              <Link
                href="/landlord/new-property"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="h-5 w-5" />
                Add Your First Property
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
