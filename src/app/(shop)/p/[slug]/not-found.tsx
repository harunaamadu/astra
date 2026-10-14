import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">We couldn&apos;t find that product</h1>
      <p className="mt-2 text-muted-foreground">
        It may have been removed, or the link may be out of date. Browse our departments or head back home.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild><Link href="/">Back to home</Link></Button>
        <Button asChild variant="outline"><Link href="/c">Browse departments</Link></Button>
      </div>
    </div>
  );
}
