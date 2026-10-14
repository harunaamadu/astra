import Link from "next/link";
import { Logo } from "@/components/layout/header/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Logo className="mb-8" />
      <main id="main" className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm md:p-8">{children}</main>
      <Link href="/" className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
        Back to Astra
      </Link>
    </div>
  );
}