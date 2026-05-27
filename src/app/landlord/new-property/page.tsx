"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CloudUpload,
  X,
  MapPin,
  Bed,
  Building2,
  Wifi,
  Car,
  Bath,
  Sofa,
  Dog,
  Wind,
  UtensilsCrossed,
  Loader2,
  ImagePlus,
  Users,
  Ban,
  Cigarette,
  Phone,
  Mail
} from "lucide-react";
import { createProperty } from "../actions";
import DynamicLocationPicker from "@/components/shared/dynamic-location-picker";

/* ─── Types ─── */
type RoomType = "SINGLE_ROOM" | "DOUBLE_ROOM" | "FLAT" | "STUDIO" | "SHARED_ROOM" | "PG";

interface FormState {
  title: string;
  description: string;
  type: RoomType;
  address: string;
  city: string;
  state: string;
  price: string;
  // Location & Contact
  lat: number;
  lng: number;
  contactPhone: string;
  contactEmail: string;
  // Amenities
  furnished: boolean;
  attachedBath: boolean;
  wifi: boolean;
  parking: boolean;
  petFriendly: boolean;
  balcony: boolean;
  kitchenAccess: boolean;
  waterIncluded: boolean;
  powerIncluded: boolean;
  // Rules
  bachelorFriendly: boolean;
  familyFriendly: boolean;
  boysOnly: boolean;
  girlsOnly: boolean;
  smokingAllowed: boolean;
}

const roomTypes: { value: RoomType; label: string; icon: typeof Bed }[] = [
  { value: "SINGLE_ROOM", label: "Single Room", icon: Bed },
  { value: "DOUBLE_ROOM", label: "Double Room", icon: Bed },
  { value: "FLAT", label: "Flat / Home", icon: Building2 },
  { value: "STUDIO", label: "Studio", icon: Sofa },
  { value: "SHARED_ROOM", label: "Shared Room", icon: Users },
  { value: "PG", label: "PG / Hostel", icon: Building2 },
];

const amenities = [
  { key: "furnished", label: "Furnished", icon: Sofa },
  { key: "attachedBath", label: "Attached Bath", icon: Bath },
  { key: "wifi", label: "High Speed WiFi", icon: Wifi },
  { key: "parking", label: "Free Parking", icon: Car },
  { key: "petFriendly", label: "Pet Friendly", icon: Dog },
  { key: "balcony", label: "Balcony", icon: Wind },
  { key: "kitchenAccess", label: "Kitchen Access", icon: UtensilsCrossed },
  { key: "waterIncluded", label: "Water Included", icon: Bath },
  { key: "powerIncluded", label: "Power Included", icon: Wind },
] as const;

const rules = [
  { key: "bachelorFriendly", label: "Bachelors Allowed", desc: "Open to single professionals", icon: Users },
  { key: "familyFriendly", label: "Family Friendly", desc: "Suitable for families", icon: Users },
  { key: "boysOnly", label: "Boys Only", desc: "Restricted to male tenants", icon: Ban },
  { key: "girlsOnly", label: "Girls Only", desc: "Restricted to female tenants", icon: Ban },
  { key: "smokingAllowed", label: "Smoking Allowed", desc: "Designated areas only", icon: Cigarette },
] as const;

/* ─── Slide animation ─── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    type: "SINGLE_ROOM",
    address: "",
    city: "",
    state: "",
    price: "",
    lat: 27.7172,
    lng: 85.3240,
    contactPhone: "",
    contactEmail: "",
    furnished: false,
    attachedBath: false,
    wifi: false,
    parking: false,
    petFriendly: false,
    balcony: false,
    kitchenAccess: false,
    waterIncluded: false,
    powerIncluded: false,
    bachelorFriendly: true,
    familyFriendly: true,
    boysOnly: false,
    girlsOnly: false,
    smokingAllowed: false,
  });

  const updateForm = (updates: Partial<FormState>) => setForm((prev) => ({ ...prev, ...updates }));

  const toggleAmenity = (key: keyof FormState) => updateForm({ [key]: !form[key] });

  const goNext = () => { setDir(1); setStep((s) => Math.min(s + 1, 2)); };
  const goBack = () => { setDir(-1); setStep((s) => Math.max(s - 1, 1)); };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 20));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload images
      let mediaUrls: string[] = [];
      if (images.length > 0) {
        const formDataUpload = new FormData();
        images.forEach((img) => formDataUpload.append("files", img.file));
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formDataUpload });
        if (!uploadRes.ok) throw new Error("Failed to upload images");
        const uploadData = await uploadRes.json();
        mediaUrls = uploadData.urls || [];
      }

      // 2. Create property + unit via server action
      const fd = new FormData();
      fd.set("title", form.title);
      fd.set("description", form.description);
      fd.set("address", form.address);
      fd.set("city", form.city);
      fd.set("state", form.state);
      fd.set("type", form.type);
      fd.set("price", form.price);
      fd.set("lat", form.lat.toString());
      fd.set("lng", form.lng.toString());
      if (form.contactPhone) fd.set("contactPhone", form.contactPhone);
      if (form.contactEmail) fd.set("contactEmail", form.contactEmail);
      // Amenities
      if (form.furnished) fd.set("furnished", "on");
      if (form.attachedBath) fd.set("attachedBath", "on");
      if (form.wifi) fd.set("wifi", "on");
      if (form.parking) fd.set("parking", "on");
      if (form.petFriendly) fd.set("petFriendly", "on");
      if (form.balcony) fd.set("balcony", "on");
      if (form.kitchenAccess) fd.set("kitchenAccess", "on");
      if (form.waterIncluded) fd.set("waterIncluded", "on");
      if (form.powerIncluded) fd.set("powerIncluded", "on");
      // Rules  
      fd.set("bachelorFriendly", form.bachelorFriendly ? "on" : "off");
      fd.set("familyFriendly", form.familyFriendly ? "on" : "off");
      fd.set("boysOnly", form.boysOnly ? "on" : "off");
      fd.set("girlsOnly", form.girlsOnly ? "on" : "off");
      fd.set("smokingAllowed", form.smokingAllowed ? "on" : "off");
      // Media
      fd.set("mediaUrls", JSON.stringify(mediaUrls));

      await createProperty(fd);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = form.title && form.address && form.city && form.state && form.price;

  return (
    <div className="min-h-dvh bg-background">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/landlord" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Link>
          <span className="text-lg font-bold tracking-tight text-primary">Roomeo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1 w-24 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs font-bold text-muted-foreground">Step {step} of 2</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Title */}
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Basic Information
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                  Enter the core details about your property listing.
                </p>
              </div>

              {/* Property Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Property Name
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm({ title: e.target.value })}
                  placeholder="e.g. Skyline Penthouse"
                  className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Property Type */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Property Type
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {roomTypes.map((rt) => (
                    <button
                      key={rt.value}
                      type="button"
                      onClick={() => updateForm({ type: rt.value })}
                      className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all active:scale-95 ${
                        form.type === rt.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <rt.icon className="h-6 w-6" />
                      <span className="text-xs font-bold">{rt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateForm({ description: e.target.value })}
                  placeholder="Describe your property - what makes it special..."
                  rows={3}
                  className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateForm({ address: e.target.value })}
                    placeholder="Start typing address..."
                    className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* City / State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                    placeholder="e.g. Kathmandu"
                    className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State / Region</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => updateForm({ state: e.target.value })}
                    placeholder="e.g. Bagmati"
                    className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Exact Map Location */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Pin Exact Location</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Required</span>
                </label>
                <DynamicLocationPicker
                  location={{ lat: form.lat, lng: form.lng }}
                  onChange={(loc) => updateForm({ lat: loc.lat, lng: loc.lng })}
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
                    <input
                      type="tel"
                      value={form.contactPhone}
                      onChange={(e) => updateForm({ contactPhone: e.target.value })}
                      placeholder="e.g. 9841000000"
                      className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => updateForm({ contactEmail: e.target.value })}
                      placeholder="e.g. owner@example.com"
                      className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price Per Month (NPR)
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground">
                    ₨
                  </span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => updateForm({ price: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!isStep1Valid}
                  className="group flex h-12 items-center gap-2 rounded-2xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Photos & Amenities
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Title */}
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Media & Amenities
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                  High-quality visuals and detailed amenities increase your chances by 40%.
                </p>
              </div>

              {/* ─── Photo Upload ─── */}
              <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Property Gallery</h2>
                    <p className="text-sm text-muted-foreground">Upload at least 3 photos for the best visibility.</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {images.length}/20 Photos
                  </span>
                </div>

                {/* Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-secondary/20 p-10 transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageAdd}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CloudUpload className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-base font-bold text-foreground">Drag and drop photos here</p>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 50MB each</p>
                  <button
                    type="button"
                    className="mt-4 rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                  >
                    Browse Files
                  </button>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl border border-border/40 bg-secondary">
                        <Image src={img.preview} alt={`Upload ${idx + 1}`} fill className="object-cover" sizes="200px" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-secondary/30 transition-all hover:border-primary/40"
                    >
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </div>
                )}
              </div>

              {/* ─── Amenities ─── */}
              <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Amenities</h2>
                  <p className="text-sm text-muted-foreground">Select all features available in this property.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amenities.map((am) => {
                    const active = form[am.key];
                    return (
                      <button
                        key={am.key}
                        type="button"
                        onClick={() => toggleAmenity(am.key)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 transition-all active:scale-95 ${
                          active
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        <am.icon className="h-5 w-5 shrink-0" />
                        <span className="text-xs font-bold">{am.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ─── Occupancy Rules ─── */}
              <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Occupancy Rules</h2>
                  <p className="text-sm text-muted-foreground">Set clear expectations for your potential tenants.</p>
                </div>
                <div className="space-y-1">
                  {rules.map((rule, idx) => {
                    const active = form[rule.key];
                    return (
                      <div
                        key={rule.key}
                        className={`flex items-center justify-between py-4 ${
                          idx < rules.length - 1 ? "border-b border-border/30" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary shrink-0">
                            <rule.icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{rule.label}</p>
                            <p className="text-xs text-muted-foreground">{rule.desc}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleAmenity(rule.key)}
                          className={`relative h-7 w-12 rounded-full transition-colors ${
                            active ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                              active ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-bold text-muted-foreground transition-all hover:bg-secondary active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      Publish Listing
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
