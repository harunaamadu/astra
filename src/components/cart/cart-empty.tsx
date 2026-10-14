import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { compact?: boolean; onNavigate?: () => void };

export function CartEmpty({ compact, onNavigate }: Props) {
  return (
    <div className={cn("flex flex-col items-center text-center", compact ? "flex-1 justify-center px-6" : "py-20")}>
      <span className="grid size-16 place-items-center rounded-full bg-secondary">
        <ShoppingCart className="size-7 text-muted-foreground" strokeWidth={1.5} aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-semibold">Your cart is empty</h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        Add something you like and it will wait here. Your cart is saved on this device.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild onClick={onNavigate}><Link href="/">Start shopping</Link></Button>
        <Button asChild variant="outline" onClick={onNavigate}><Link href="/deals">See today&apos;s deals</Link></Button>
      </div>
    </div>
  );
}
