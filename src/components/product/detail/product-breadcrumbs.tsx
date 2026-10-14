import Link from "next/link";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { NavLink } from "@/types";

export function ProductBreadcrumbs({ trail, current }: { trail: NavLink[]; current: string }) {
  const items = [{ label: "Home", href: "/" }, ...trail];
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {items.map((item) => (
          <BreadcrumbItem key={item.href}>
            <BreadcrumbLink asChild><Link href={item.href}>{item.label}</Link></BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 max-w-[16rem]">{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
