"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/features/marketing/actions";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    start(async () => {
      const res = await subscribeNewsletter(parsed.data);
      if (res.ok) {
        toast.success("You're subscribed");
        formRef.current?.reset();
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("w-full max-w-md", className)}>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
        />
        <Button type="submit" size="lg" disabled={pending} className="h-11">
          {pending ? "Subscribing" : "Subscribe"}
        </Button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
