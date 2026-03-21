import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { daysLeftInTrial } from "@/lib/subscription";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const trialDays = daysLeftInTrial(user);

  const planLabels: Record<string, string> = {
    FREE: "Gratuito",
    TRIAL: "Trial",
    PRO: "PRO",
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie sua conta e assinatura</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Plano Atual
          </CardTitle>
          <CardDescription>Informações sobre sua assinatura</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant={user.plan === "PRO" ? "default" : "secondary"} className="text-sm">
              {planLabels[user.plan]}
            </Badge>
            {user.plan === "TRIAL" && trialDays > 0 && (
              <span className="text-sm text-muted-foreground">
                {trialDays} dias restantes
              </span>
            )}
          </div>

          {user.plan === "PRO" && user.stripeCurrentPeriodEnd && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Renova em {formatDate(user.stripeCurrentPeriodEnd)}</span>
            </div>
          )}

          {user.plan !== "PRO" && (
            <Button asChild>
              <Link href="/pricing">Fazer Upgrade para PRO — R$ 29,90/mês</Link>
            </Button>
          )}

          {user.plan === "PRO" && (
            <p className="text-xs text-muted-foreground">
              Gerencie sua assinatura pelo portal do Stripe.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Email: </span>
            <span>{user.email}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Nome: </span>
            <span>{user.name || "Não informado"}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Membro desde: </span>
            <span>{formatDate(user.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
