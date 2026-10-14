"use client";

import { useState, useTransition } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/form-field";
import { forgotPasswordAction } from "@/features/auth/actions";
import { forgotPasswordSchema } from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center text-center">
        <MailCheck className="size-10 text-primary" strokeWidth={1.5} aria-hidden />
        <h2 className="mt-3 font-semibold">Check your email</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          If an account exists for {email}, we&apos;ve sent a link to reset your password.
        </p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setError(undefined);
    start(async () => {
      const res = await forgotPasswordAction(parsed.data);
      res.ok ? setSent(true) : setError(res.message);
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id="forgot-email" name="email" label="Email" type="email" autoComplete="email" value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? "Sending" : "Send reset link"}</Button>
    </form>
  );
}
