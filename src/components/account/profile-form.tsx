"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/form-field";
import { updateProfile } from "@/features/account/actions";
import { profileSchema } from "@/lib/validations/auth";

export function ProfileForm({ defaults }: { defaults: { name: string; email: string } }) {
  const [values, setValues] = useState({ name: defaults.name, email: defaults.email, phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();

  const bind = (name: keyof typeof values) => ({
    id: `profile-${name}`, name, value: values[name], error: errors[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((er) => ({ ...er, [name]: "" }));
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = profileSchema.safeParse({ ...values, phone: values.phone || undefined });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ||= i.message;
      setErrors(errs);
      return;
    }
    start(async () => {
      const res = await updateProfile(parsed.data);
      res.ok ? toast.success("Profile updated") : toast.error(res.message);
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-xl gap-4">
      <Field {...bind("name")} label="Full name" autoComplete="name" />
      <Field {...bind("email")} label="Email" type="email" autoComplete="email" />
      <Field {...bind("phone")} label="Phone (optional)" type="tel" autoComplete="tel" />
      <div><Button type="submit" disabled={pending}>{pending ? "Saving" : "Save changes"}</Button></div>
    </form>
  );
}