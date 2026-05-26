"use client";

import { createUnit } from "../../../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUnitPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Upload files first if any
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        const uploadData = new FormData();
        for (const file of files) {
          uploadData.append("files", file);
        }
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (!res.ok) throw new Error("Upload failed");
        
        const { urls } = await res.json();
        uploadedUrls = urls;
      }

      // Add urls to form data as JSON
      formData.set("mediaUrls", JSON.stringify(uploadedUrls));

      // Call server action
      await createUnit(params.id, formData);
      
    } catch (error) {
      console.error(error);
      alert("Failed to create unit");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Unit</h1>
        <p className="mt-2 text-muted-foreground">
          Create a room, flat, or PG bed listing for this property.
        </p>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary file:mr-4 file:rounded file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20"
              />
              {files.length > 0 && (
                <p className="text-xs text-muted-foreground">{files.length} file(s) selected</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Unit Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Spacious 2BHK Flat"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                name="description"
                required
                placeholder="Describe the unit..."
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Unit Type</label>
                <select
                  name="type"
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="SINGLE_ROOM">Single Room</option>
                  <option value="DOUBLE_ROOM">Double Room</option>
                  <option value="SHARED_ROOM">Shared Room</option>
                  <option value="FLAT">Flat</option>
                  <option value="STUDIO">Studio</option>
                  <option value="PG">PG</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Monthly Rent (NPR)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="100"
                  inputMode="numeric"
                  placeholder="e.g. 15000"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-6">
            <h3 className="mb-4 text-sm font-medium text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { id: "furnished", label: "Furnished" },
                { id: "attachedBath", label: "Attached Bath" },
                { id: "wifi", label: "Wi-Fi" },
                { id: "parking", label: "Parking" },
                { id: "petFriendly", label: "Pet Friendly" },
                { id: "balcony", label: "Balcony" },
                { id: "kitchenAccess", label: "Kitchen Access" },
              ].map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                     type="checkbox"
                    name={amenity.id}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  {amenity.label}
                </label>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isUploading ? "Uploading & Creating..." : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
