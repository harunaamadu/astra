"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const options = [
  { id: "deals", label: "Weekly deals and new arrivals", defaultOn: true },
  { id: "orders", label: "Order and delivery updates", defaultOn: true, locked: true },
  { id: "plus", label: "Astra Plus offers", defaultOn: false },
] as const;

/** Demo only: preferences are not stored until the database exists (step 6). */
export function EmailPreferences() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(Object.fromEntries(options.map((o) => [o.id, o.defaultOn])));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Email preferences saved");
      }}
      className="space-y-3"
    >
      {options.map((o) => (
        <label key={o.id} className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={prefs[o.id]}
            disabled={"locked" in o}
            onChange={(e) => setPrefs((p) => ({ ...p, [o.id]: e.target.checked }))}
            className="size-4 accent-primary"
          />
          <span>{o.label}{"locked" in o && <span className="text-muted-foreground"> (always on)</span>}</span>
        </label>
      ))}
      <Button type="submit" variant="outline" size="sm">Save preferences</Button>
    </form>
  );
}