"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { popularSearches } from "@/lib/constants/navigation";
import { useDepartments } from "@/components/providers/departments-provider";
import { searchSchema } from "@/lib/validations/search";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchBar() {
  const router = useRouter();
  const departments = useDepartments();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [focused, setFocused] = useState(false);
  const debounced = useDebounce(q, 150);

  // Placeholder suggestions; replaced by /api/search/suggest (Prisma full-text) in the backend phase.
  const suggestions = useMemo(() => {
    const term = debounced.trim().toLowerCase();
    if (!term) return popularSearches.slice(0, 5);
    return popularSearches.filter((s) => s.includes(term)).slice(0, 5);
  }, [debounced]);

  function submit(value = q) {
    const parsed = searchSchema.safeParse({ q: value, category });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      inputRef.current?.focus();
      return;
    }
    setFocused(false);
    const params = new URLSearchParams({ q: parsed.data.q });
    if (parsed.data.category !== "all") params.set("category", parsed.data.category);
    router.push(`/search?${params}`);
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative flex h-11 w-full overflow-hidden rounded-lg border bg-background focus-within:ring-2 focus-within:ring-primary"
    >
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger
          aria-label="Search category"
          className="h-full! w-28 shrink-0 rounded-none border-0 border-r bg-secondary/60 text-xs shadow-none focus:ring-0 sm:w-36 sm:text-sm"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {departments.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        type="search"
        name="q"
        autoComplete="off"
        placeholder="Search Astra"
        aria-label="Search Astra"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
      />

      <button
        type="submit"
        aria-label="Search"
        className="grid w-12 shrink-0 place-items-center bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
      >
        <Search className="size-5" aria-hidden />
      </button>

      {focused && suggestions.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-lg border bg-popover py-1 shadow-lg">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQ(s);
                  submit(s);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
              >
                <Search className="size-4 text-muted-foreground" aria-hidden />
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
