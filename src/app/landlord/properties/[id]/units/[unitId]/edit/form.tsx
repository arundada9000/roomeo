"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUnit } from "../../../../../actions";

const AMENITIES = [
  { id: "furnished", label: "Furnished" },
  { id: "attachedBath", label: "Attached Bath" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "parking", label: "Parking" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "balcony", label: "Balcony" },
  { id: "kitchenAccess", label: "Kitchen Access" },
  { id: "waterIncluded", label: "Water Included" },
  { id: "powerIncluded", label: "Power Included" },
];

export default function EditUnitForm({ unit }: { unit: Record<string, unknown> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      await updateUnit(unit.id, formData);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update unit");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Unit Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={unit.title}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea
            name="description"
            required
            defaultValue={unit.description}
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
              defaultValue={unit.type}
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
              defaultValue={unit.price}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 pt-6">
        <h3 className="mb-4 text-sm font-medium text-foreground">Amenities</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {AMENITIES.map((amenity) => (
            <label key={amenity.id} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                name={amenity.id}
                defaultChecked={(unit as Record<string, unknown>)[amenity.id] === true}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              {amenity.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
