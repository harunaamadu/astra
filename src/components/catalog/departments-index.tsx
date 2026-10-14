import Link from "next/link";
import { departments } from "@/lib/constants/navigation";

/** Shown at /c. Every department with its subcategories. */
export function DepartmentsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <h1 className="text-2xl font-semibold md:text-3xl">All departments</h1>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <section key={d.id} aria-labelledby={`dept-${d.id}`} className="rounded-2xl border p-5">
            <h2 id={`dept-${d.id}`} className="text-lg font-semibold">
              <Link href={d.href} className="hover:underline">{d.label}</Link>
            </h2>
            <ul className="mt-3 space-y-1.5">
              {d.groups.flatMap((g) => g.links).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
