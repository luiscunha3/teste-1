"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TrialBannerProps {
  daysLeft: number;
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  if (daysLeft <= 0) return null;

  return (
    <div className="bg-accent text-accent-foreground px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
      <Clock className="h-4 w-4" />
      <span>
        {daysLeft === 1
          ? "Último dia do seu trial gratuito!"
          : `${daysLeft} dias restantes no trial gratuito.`}
      </span>
      <Button variant="outline" size="sm" className="ml-2 h-7 text-xs" asChild>
        <Link href="/pricing">Assinar PRO</Link>
      </Button>
    </div>
  );
}
