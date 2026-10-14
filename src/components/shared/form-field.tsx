import { cn } from "@/lib/utils";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string; hint?: string };

const control =
  "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary aria-[invalid=true]:border-destructive";

export function FieldShell({ id, label, error, hint, className, children }: {
  id: string; label: string; error?: string; hint?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function Field({ id, label, error, hint, className, ...input }: FieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} className={className}>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={control} {...input} />
    </FieldShell>
  );
}

export function SelectField({ id, label, error, className, children, ...select }: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string; label: string; error?: string }) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <select id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={cn(control, "appearance-auto")} {...select}>
        {children}
      </select>
    </FieldShell>
  );
}