"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldShell } from "@/components/shared/form-field";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string; hint?: string };

export function PasswordField({ id, label, error, hint, ...input }: Props) {
  const [show, setShow] = useState(false);
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-10 w-full rounded-lg border bg-background pl-3 pr-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary aria-invalid:border-destructive"
          {...input}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      </div>
    </FieldShell>
  );
}
