"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/form-field";
import { PasswordField } from "./password-field";
import { signUpAction } from "@/features/auth/actions";
import { signUpSchema } from "@/lib/validations/auth";

export function SignUpForm({ next }: { next: string }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const bind = (name: keyof typeof values) => ({
    id: `signup-${name}`, name, value: values[name], error: errors[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((er) => ({ ...er, [name]: "" }));
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = signUpSchema.safeParse({ ...values, terms, next });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ||= i.message;
      setErrors(errs);
      return;
    }
    start(async () => {
      const res = await signUpAction(parsed.data);
      if (res.ok) router.push(res.redirectTo);
      else {
        setFormError(res.message);
        if (res.fieldErrors) setErrors(res.fieldErrors);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{formError}</p>}
      <Field {...bind("name")} label="Full name" autoComplete="name" />
      <Field {...bind("email")} label="Email" type="email" autoComplete="email" />
      <PasswordField {...bind("password")} label="Password" autoComplete="new-password" hint="At least 8 characters, with a letter and a number." />
      <div>
        <label className="flex items-start gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => { setTerms(e.target.checked); setErrors((er) => ({ ...er, terms: "" })); }}
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? "signup-terms-error" : undefined}
            className="mt-0.5 size-4 accent-primary"
          />
          <span>
            I agree to the <Link href="/legal/terms" className="underline underline-offset-4">Conditions of use</Link> and{" "}
            <Link href="/legal/privacy" className="underline underline-offset-4">Privacy notice</Link>.
          </span>
        </label>
        {errors.terms && <p id="signup-terms-error" role="alert" className="mt-1 text-sm text-destructive">{errors.terms}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? "Creating account" : "Create account"}</Button>
    </form>
  );
}
