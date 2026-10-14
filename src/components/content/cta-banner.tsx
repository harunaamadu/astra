import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { title: string; text: string; label: string; href: string };

export function CtaBanner({ title, text, label, href }: Props) {
  return (
    <section aria-label={title} className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-primary/20 p-6 sm:flex-row sm:items-center md:p-8">
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-muted-foreground">{text}</p>
      </div>
      <Button asChild size="lg"><Link href={href}>{label}</Link></Button>
    </section>
  );
}
