"use client";

import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccountMenuProps = { user?: { name: string } | null };

// `user` is wired to Auth.js in the backend phase. Until then it is always null.
export function AccountMenu({ user = null }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-11 gap-2 px-2 sm:px-3">
          <User className="size-5" aria-hidden />
          <span className="hidden text-left leading-tight lg:block">
            <span className="block text-[11px] text-muted-foreground">
              {user ? `Hi, ${user.name}` : "Hello, sign in"}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium">
              Account <ChevronDown className="size-3" aria-hidden />
            </span>
          </span>
          <span className="sr-only lg:hidden">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/account">Your account</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/account/orders">Orders</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/account/subscriptions">Subscriptions</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/sell">Sell on Astra</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/api/auth/signout">Sign out</Link></DropdownMenuItem>
          </>
        ) : (
          <>
            <div className="p-2">
              <Button asChild className="w-full"><Link href="/sign-in">Sign in</Link></Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                New to Astra? <Link href="/sign-up" className="underline">Create an account</Link>
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/account/orders">Track an order</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/help">Help</Link></DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
