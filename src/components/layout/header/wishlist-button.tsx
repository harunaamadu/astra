"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "cn";

export function WishlistButton({ className }: { className?: string }) {
  const mounted = useMounted();
  const count = useWishlistStore((s) => s.ids.length);
  const shown = mounted ? count : 0;

  return (
    <Button asChild variant="ghost" className={cn("relative h-11 px-3 sm:inline-flex", className)}>
      <Link href="/account/wishlist" aria-label={`Wishlist, ${shown} saved`}>
        <Heart className="size-5" aria-hidden />
        {shown > 0 && (
          <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" aria-hidden />
        )}
      </Link>
    </Button>
  );
}
