import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SellerCta() {
  return (
    <section aria-labelledby="sell" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-foreground p-6 text-background md:flex-row md:items-center md:p-10">
        <div className="max-w-xl">
          <h2 id="sell" className="text-2xl font-bold md:text-3xl">Sell your products on Astra</h2>
          <p className="mt-2 opacity-80">
            Reach shoppers, track sales in your seller dashboard, and promote listings when you want more visibility.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/sell">Start selling</Link></Button>
          <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
            <Link href="/sell/pro">See Seller Pro</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
