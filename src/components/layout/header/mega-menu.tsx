"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { departments } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(departments[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const active = departments.find((d) => d.id === activeId) ?? departments[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="gap-2 font-medium"
      >
        <LayoutGrid className="size-4" aria-hidden />
        All departments
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 flex w-[min(880px,92vw)] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl"
          >
            <ul className="w-60 shrink-0 border-r bg-secondary/40 py-2">
              {departments.map((d) => (
                <li key={d.id}>
                  <Link
                    href={d.href}
                    onMouseEnter={() => setActiveId(d.id)}
                    onFocus={() => setActiveId(d.id)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                      d.id === activeId ? "bg-background font-medium" : "hover:bg-background/60",
                    )}
                  >
                    {d.label}
                    <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="grid flex-1 grid-cols-3 gap-6 p-6">
              {active.groups.map((g) => (
                <div key={g.title}>
                  <p className="mb-2 text-sm font-semibold">{g.title}</p>
                  <ul className="space-y-1.5">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
