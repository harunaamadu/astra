import { ProductBreadcrumbs } from "@/components/product/detail/product-breadcrumbs";
import type { NavLink } from "@/types";

type Props = {
  title: string;
  intro?: string;
  trail?: NavLink[];
  /** "narrow" for reading pages, "wide" for marketing pages with cards */
  width?: "narrow" | "wide";
  meta?: React.ReactNode;
  children: React.ReactNode;
};

/** Breadcrumb, heading and a consistent reading width for every content page. */
export function PageShell({ title, intro, trail = [], width = "narrow", meta, children }: Props) {
  return (
    <div className={width === "narrow" ? "mx-auto max-w-3xl px-4 py-6 md:py-10" : "mx-auto max-w-6xl px-4 py-6 md:py-10"}>
      <ProductBreadcrumbs trail={trail} current={title} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {meta}
      </header>
      {children}
    </div>
  );
}
