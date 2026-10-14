"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/form-field";
import { PasswordField } from "./password-field";
import { signInAction } from "@/features/auth/actions";
import { signInSchema } from "@/lib/validations/auth";

export function SignInForm({ next }: { next: string }) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const bind = (name: keyof typeof values) => ({
    id: `signin-${name}`, name, value: values[name], error: errors[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((er) => ({ ...er, [name]: "" }));
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = signInSchema.safeParse({ ...values, next });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ||= i.message;
      setErrors(errs);
      return;
    }
    start(async () => {
      const res = await signInAction(parsed.data);
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
      <Field {...bind("email")} label="Email" type="email" autoComplete="email" />
      <div>
        <PasswordField {...bind("password")} label="Password" autoComplete="current-password" />
        <Link href="/forgot-password" className="mt-1.5 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Forgot your password?
        </Link>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? "Signing in" : "Sign in"}</Button>
    </form>
  );
}
