import type { Section } from "@/types/content";

export function ContentSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s) => (
        <section key={s.heading} aria-labelledby={`s-${s.heading.replace(/\W+/g, "-").toLowerCase()}`}>
          <h2 id={`s-${s.heading.replace(/\W+/g, "-").toLowerCase()}`} className="mb-3 text-xl font-semibold md:text-2xl">{s.heading}</h2>
          {s.paragraphs?.map((p) => <p key={p} className="mb-3 max-w-prose leading-relaxed text-muted-foreground">{p}</p>)}
          {s.items && (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((i) => (
                <li key={i.title} className="rounded-xl border p-4">
                  <h3 className="font-medium">{i.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
