"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

interface NavbarProps {
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Truck className="h-6 w-6 text-primary" />
          <span>MudaFácil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/settings/billing" className="text-sm text-muted-foreground hover:text-foreground">
                Conta
              </Link>
            </>
          ) : (
            <>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Preços
              </Link>
              <Button asChild size="sm">
                <Link href="/login">Entrar</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
