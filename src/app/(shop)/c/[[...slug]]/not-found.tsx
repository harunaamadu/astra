import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">We couldn&apos;t find that category</h1>
      <p className="mt-2 text-muted-foreground">The link may be out of date. Browse every department instead.</p>
      <div className="mt-6 flex gap-3">
        <Button asChild><Link href="/c">All departments</Link></Button>
        <Button asChild variant="outline"><Link href="/">Back to home</Link></Button>
      </div>
    </div>
  );
}
