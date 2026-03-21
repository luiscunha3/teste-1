"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PaywallGateProps {
  children: React.ReactNode;
  hasAccess: boolean;
  featureName?: string;
}

export function PaywallGate({ children, hasAccess, featureName }: PaywallGateProps) {
  if (hasAccess) return <>{children}</>;

  return (
    <Card className="border-dashed border-2 border-warning">
      <CardHeader className="text-center">
        <Lock className="mx-auto h-8 w-8 text-muted-foreground" />
        <CardTitle className="text-lg">
          {featureName ? `${featureName} — Recurso PRO` : "Recurso PRO"}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Faça upgrade para o plano PRO e tenha acesso ilimitado.
        </p>
        <Button asChild>
          <Link href="/pricing">Ver Planos — R$ 29,90/mês</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
