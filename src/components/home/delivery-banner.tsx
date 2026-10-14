import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const promises = [
  { icon: Truck, title: "Tracked delivery", text: "Follow every order from seller to your door." },
  { icon: RotateCcw, title: "Easy returns", text: "Change your mind within the return window and send it back." },
  { icon: ShieldCheck, title: "Secure checkout", text: "Pay with the method you trust. Card details never touch our servers." },
];

export function DeliveryBanner() {
  return (
    <section aria-labelledby="delivery" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="rounded-2xl border p-6 md:p-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 id="delivery" className="text-2xl font-bold md:text-4xl">Astra delivers to you</h2>
            <p className="mt-2 text-muted-foreground">
              Order from sellers across the marketplace and get one tracked delivery experience.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/help/shipping">Shipping details</Link>
          </Button>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/20 text-primary-foreground dark:text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
