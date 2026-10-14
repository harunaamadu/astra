import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="relative overflow-hidden rounded-2xl bg-primary/20 p-6 md:p-10">
        <div className="relative z-10 max-w-lg">
          <h2 id="newsletter" className="text-2xl font-bold md:text-3xl">Get deals before they sell out</h2>
          <p className="mb-5 mt-2 text-muted-foreground">One email a week with price drops and new arrivals. Unsubscribe any time.</p>
          <NewsletterForm />
        </div>
        <Mail aria-hidden strokeWidth={1} className="absolute -right-6 top-1/2 hidden size-64 -translate-y-1/2 text-foreground/10 md:block" />
      </div>
    </section>
  );
}
