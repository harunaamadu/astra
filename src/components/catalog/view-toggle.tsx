"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCatalogNav } from "./catalog-nav-provider";

export function ViewToggle() {
  const { query, update } = useCatalogNav();
  const items = [
    { mode: "grid", label: "Grid view", Icon: LayoutGrid },
    { mode: "list", label: "List view", Icon: List },
  ] as const;

  return (
    <div role="group" aria-label="Layout" className="hidden items-center rounded-lg border p-0.5 sm:flex">
      {items.map(({ mode, label, Icon }) => (
        <Button
          key={mode}
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          aria-pressed={query.view === mode}
          onClick={() => update({ view: mode })}
          className={cn("size-8", query.view === mode && "bg-accent")}
        >
          <Icon className="size-4" aria-hidden />
        </Button>
      ))}
    </div>
  );
}
