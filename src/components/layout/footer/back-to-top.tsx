"use client";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="w-full bg-secondary py-3 h-auto text-center text-sm transition-colors hover:bg-accent"
    >
      Back to top
    </Button>
  );
}
