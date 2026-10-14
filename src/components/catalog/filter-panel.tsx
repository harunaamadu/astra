"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { FacetOption, Facets, FilterQuery, PriceBounds, QueryPatch } from "@/types/catalog";

type Props = {
  facets: Facets;
  priceBounds: PriceBounds;
  value: FilterQuery;
  onChange: (patch: QueryPatch) => void;
  /** keeps input ids/names unique when the sidebar and the mobile sheet both exist */
  idPrefix: string;
};

function Section({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">{title}</AccordionTrigger>
      <AccordionContent className="pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

function CheckboxFacet({
  options, selected, onToggle, searchable, label,
}: { options: FacetOption[]; selected: string[]; onToggle: (value: string) => void; searchable?: boolean; label: string }) {
  const [expanded, setExpanded] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));
  const shown = expanded || q ? filtered : filtered.slice(0, 6);

  return (
    <div>
      {searchable && options.length > 8 && (
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}`}
            aria-label={`Search ${label.toLowerCase()}`}
            className="h-8 w-full rounded-md border bg-background pl-8 pr-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      )}
      <ul className="space-y-0.5">
        {shown.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
              <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} className="size-4 accent-primary" />
              <span className="flex-1">{o.label}</span>
              <span className="text-xs tabular-nums text-muted-foreground">{o.count}</span>
            </label>
          </li>
        ))}
        {shown.length === 0 && <li className="py-1 text-sm text-muted-foreground">No matches</li>}
      </ul>
      {!q && filtered.length > 6 && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          {expanded ? "Show fewer" : `Show all (${filtered.length})`}
        </button>
      )}
    </div>
  );
}

function RatingFacet({ facets, value, onChange, idPrefix }: Pick<Props, "facets" | "value" | "onChange" | "idPrefix">) {
  return (
    <fieldset>
      <legend className="sr-only">Minimum customer rating</legend>
      <ul className="space-y-0.5">
        {facets.rating.map((r) => (
          <li key={r.min}>
            <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
              <input type="radio" name={`${idPrefix}-rating`} checked={value.rating === r.min} onChange={() => onChange({ rating: r.min })} className="size-4 accent-primary" />
              <span className="flex items-center gap-1.5">
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={i < r.min ? "size-3.5 fill-primary text-primary" : "size-3.5 text-border"} />
                  ))}
                </span>
                <span>{r.min === 4 ? "4 & up" : `${r.min}+`}</span>
              </span>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">{r.count}</span>
            </label>
          </li>
        ))}
      </ul>
      {value.rating && (
        <button type="button" onClick={() => onChange({ rating: undefined })} className="mt-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Any rating
        </button>
      )}
    </fieldset>
  );
}

function PriceFacet({ bounds, value, onChange, idPrefix }: { bounds: PriceBounds; value: FilterQuery; onChange: Props["onChange"]; idPrefix: string }) {
  const [lo, setLo] = useState(value.min ?? bounds.min);
  const [hi, setHi] = useState(value.max ?? bounds.max);

  function commit(a: number, b: number) {
    const min = Math.max(bounds.min, Math.min(a, b));
    const max = Math.min(bounds.max, Math.max(a, b));
    setLo(min);
    setHi(max);
    onChange({ min: min <= bounds.min ? undefined : min, max: max >= bounds.max ? undefined : max });
  }

  if (bounds.max <= bounds.min) return <p className="text-sm text-muted-foreground">No price range</p>;

  return (
    <div className="space-y-4">
      <Slider
        min={bounds.min}
        max={bounds.max}
        step={1}
        value={[lo, hi]}
        onValueChange={([a, b]) => { setLo(a); setHi(b); }}
        onValueCommit={([a, b]) => commit(a, b)}
        aria-label="Price range"
        className="px-1"
      />
      <div className="flex items-center gap-2">
        {([["min", lo, setLo], ["max", hi, setHi]] as const).map(([name, val, set], i) => (
          <div key={name} className="flex flex-1 items-center gap-2">
            {i === 1 && <span aria-hidden className="text-muted-foreground">to</span>}
            <label htmlFor={`${idPrefix}-${name}`} className="sr-only">{name === "min" ? "Minimum price" : "Maximum price"}</label>
            <div className="relative flex-1">
              <span aria-hidden className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
              <input
                id={`${idPrefix}-${name}`}
                type="number"
                inputMode="numeric"
                min={bounds.min}
                max={bounds.max}
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                onBlur={() => commit(lo, hi)}
                onKeyDown={(e) => e.key === "Enter" && commit(lo, hi)}
                className="h-8 w-full rounded-md border bg-background pl-5 pr-1.5 text-sm tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorFacet({ options, selected, onToggle }: { options: FacetOption[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((o) => (
        <li key={o.value}>
          <label className="cursor-pointer" title={`${o.label} (${o.count})`}>
            <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} className="peer sr-only" />
            <span className="grid size-8 place-items-center rounded-full border-2 border-transparent peer-checked:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <span className={cn("size-5 rounded-full border border-border")} style={{ backgroundColor: o.swatch }} />
              <span className="sr-only">{o.label}, {o.count} products</span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function FilterPanel({ facets, priceBounds, value, onChange, idPrefix }: Props) {
  const open = ["seller", "rating", "brand", "price", "color", ...facets.attrs.map((a) => `a_${a.key}`)];
  // Remount the price control whenever the applied range changes (chips, reset, back button).
  const priceKey = `${value.min ?? "x"}-${value.max ?? "x"}`;

  return (
    <Accordion type="multiple" defaultValue={open} className="w-full">
      {facets.seller.length > 0 && (
        <Section value="seller" title="Seller">
          <CheckboxFacet label="Sellers" options={facets.seller} selected={value.seller} onToggle={(v) => onChange({ seller: toggle(value.seller, v) })} />
        </Section>
      )}
      {facets.rating.length > 0 && (
        <Section value="rating" title="Customer rating">
          <RatingFacet facets={facets} value={value} onChange={onChange} idPrefix={idPrefix} />
        </Section>
      )}
      {facets.brand.length > 0 && (
        <Section value="brand" title="Brand">
          <CheckboxFacet label="Brands" searchable options={facets.brand} selected={value.brand} onToggle={(v) => onChange({ brand: toggle(value.brand, v) })} />
        </Section>
      )}
      <Section value="price" title="Price">
        <PriceFacet key={priceKey} bounds={priceBounds} value={value} onChange={onChange} idPrefix={idPrefix} />
      </Section>
      {facets.color.length > 0 && (
        <Section value="color" title="Color">
          <ColorFacet options={facets.color} selected={value.color} onToggle={(v) => onChange({ color: toggle(value.color, v) })} />
        </Section>
      )}
      {facets.attrs.map((a) =>
        a.options.length > 0 ? (
          <Section key={a.key} value={`a_${a.key}`} title={a.label}>
            <CheckboxFacet
              label={a.label}
              options={a.options}
              selected={value.attrs[a.key] ?? []}
              onToggle={(v) => onChange({ attrs: { ...value.attrs, [a.key]: toggle(value.attrs[a.key] ?? [], v) } })}
            />
          </Section>
        ) : null,
      )}
    </Accordion>
  );
}
