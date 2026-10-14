import { Suspense } from "react";
import { AccountNav } from "@/components/account/account-nav";
import { requireSession } from "@/lib/auth/session";

function AccountSkeleton() {
  return (
    <div role="status" aria-label="Loading your account" className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <div className="h-40 animate-pulse rounded-xl bg-muted" />
      <div className="h-96 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Suspense fallback={<AccountSkeleton />}>
        <AccountShell>{children}</AccountShell>
      </Suspense>
    </div>
  );
}

/** Reads the session, so it must sit inside <Suspense>. Guests are redirected to sign-in. */
async function AccountShell({ children }: { children: React.ReactNode }) {
  const session = await requireSession("/account");
  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <div>
        <p className="mb-3 hidden px-3 text-sm text-muted-foreground lg:block">Signed in as {session.name}</p>
        <AccountNav />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}