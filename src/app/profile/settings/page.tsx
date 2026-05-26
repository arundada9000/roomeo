"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Camera, Loader2, Save, User as UserIcon } from "lucide-react";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState(session?.user?.name || "");
  const [imagePreview, setImagePreview] = useState<string | null>(session?.user?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when session loads
  if (!isPending && session && name === "" && !imagePreview) {
    setName(session.user.name || "");
    setImagePreview(session.user.image || null);
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      let finalImageUrl = session.user.image;

      // 1. Upload image if changed
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Failed to upload image");
        
        const data = await uploadRes.json();
        if (data.urls && data.urls.length > 0) {
          finalImageUrl = data.urls[0];
        }
      }

      // 2. Update user profile via better-auth
      const { error } = await authClient.updateUser({
        name: name,
        image: finalImageUrl || undefined,
      });

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully!" });
      
      // Refresh the router to propagate session changes
      router.refresh();

    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-border/40 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Account Settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your personal information and profile picture.
          </p>
        </div>

        {message && (
          <div className={`mb-8 rounded-2xl border px-4 py-3 text-sm font-medium ${
            message.type === "success" 
              ? "border-green-500/20 bg-green-500/10 text-green-600" 
              : "border-destructive/20 bg-destructive/10 text-destructive"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 rounded-full border-2 border-border/50 bg-secondary overflow-hidden shadow-sm">
              {imagePreview ? (
                <Image src={imagePreview} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-primary">
                  <UserIcon className="h-10 w-10" />
                </div>
              )}
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100"
              >
                <Camera className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex flex-col justify-center text-center sm:text-left sm:pt-4">
              <h3 className="text-sm font-semibold text-foreground">Profile Picture</h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                We recommend an image of at least 400x400px.
              </p>
              <div className="mt-4 flex justify-center sm:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/80"
                >
                  Change Picture
                </button>
                {imagePreview && imagePreview !== session.user.image && (
                   <button
                   type="button"
                   onClick={() => {
                     setImagePreview(session.user.image || null);
                     setImageFile(null);
                     if (fileInputRef.current) fileInputRef.current.value = '';
                   }}
                   className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                 >
                   Cancel
                 </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="h-px w-full bg-border/40" />

          {/* User Details */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-2xl border border-border/60 bg-secondary/30 py-3.5 px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full rounded-2xl border border-border/60 bg-secondary/10 py-3.5 px-4 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-70"
              />
              <p className="text-[11px] text-muted-foreground px-1">
                Email address cannot be changed at this time.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 sm:w-auto sm:px-10"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
