"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const KEY = "astra-cookie-prefs";

/**
 * Stores the choice in this browser. Analytics and advertising scripts, once added,
 * must check this value (or the server-side cookie that replaces it) before loading.
 */
export function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (saved) {
        setAnalytics(!!saved.analytics);
        setAdvertising(!!saved.advertising);
      }
    } catch {
      /* storage unavailable: keep defaults (off) */
    }
  }, []);

  function save(next: { analytics: boolean; advertising: boolean }) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    toast.success("Cookie preferences saved");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save({ analytics, advertising });
      }}
      className="mt-10 max-w-xl space-y-4 rounded-2xl border p-6"
    >
      <h2 className="text-lg font-semibold">Your choices</h2>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked disabled className="size-4 accent-primary" /> Essential (always on)</label>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="size-4 accent-primary" /> Analytics</label>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={advertising} onChange={(e) => setAdvertising(e.target.checked)} className="size-4 accent-primary" /> Advertising</label>
      <div className="flex gap-3 pt-2">
        <Button type="submit">Save preferences</Button>
        <Button type="button" variant="outline" onClick={() => { setAnalytics(false); setAdvertising(false); save({ analytics: false, advertising: false }); }}>
          Reject optional
        </Button>
      </div>
    </form>
  );
}
