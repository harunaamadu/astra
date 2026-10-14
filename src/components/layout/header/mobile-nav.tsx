"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { departments, subNavLinks, utilityLinks } from "@/lib/constants/navigation";
import { useUIStore } from "@/store/ui-store";
import { Logo } from "./logo";

export function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const setOpen = useUIStore((s) => s.setMobileNavOpen);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 hidden" aria-label="Open menu">
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle><Logo /></SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible className="px-4">
          {departments.map((d) => (
            <AccordionItem key={d.id} value={d.id}>
              <AccordionTrigger className="text-sm">{d.label}</AccordionTrigger>
              <AccordionContent className="[&_a]:no-underline">
                <ul className="space-y-2 pl-1">
                  <li>
                    <Link href={d.href} onClick={close} className="text-sm font-medium">
                      Shop all {d.label}
                    </Link>
                  </li>
                  {d.groups.flatMap((g) => g.links).map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={close} className="text-sm text-muted-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <nav aria-label="More" className="space-y-3 border-t p-4 text-sm">
          {[...subNavLinks, ...utilityLinks].map((l) => (
            <Link key={l.href} href={l.href} onClick={close} className="block">
              {l.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
