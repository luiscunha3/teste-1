import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Truck, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const mudancas = await db.mudanca.findMany({
    where: { userId: session.user.id },
    include: { caminhao: true, _count: { select: { cotacoes: true } } },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  const stats = {
    total: mudancas.length,
    ativas: mudancas.filter((m) => !["CONCLUIDA", "CANCELADA"].includes(m.status)).length,
    cotacoes: mudancas.reduce((acc, m) => acc + m._count.cotacoes, 0),
  };

  const statusLabels: Record<string, string> = {
    RASCUNHO: "Rascunho",
    COTANDO: "Cotando",
    CONFIRMADA: "Confirmada",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada",
  };

  const statusVariant: Record<string, "default" | "secondary" | "success" | "destructive" | "warning" | "outline"> = {
    RASCUNHO: "outline",
    COTANDO: "warning",
    CONFIRMADA: "default",
    CONCLUIDA: "success",
    CANCELADA: "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Olá, {session.user.name || "Bem-vindo"}!
          </p>
        </div>
        <Button asChild>
          <Link href="/app/mudanca">
            <Plus className="h-4 w-4 mr-2" />
            Nova Mudança
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Mudanças</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              {stats.total}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Mudanças Ativas</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Truck className="h-5 w-5 text-accent" />
              {stats.ativas}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cotações Recebidas</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-success" />
              {stats.cotacoes}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Mudanças</CardTitle>
          <CardDescription>Gerencie suas mudanças em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          {mudancas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhuma mudança ainda.</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/app/mudanca">Criar sua primeira mudança</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {mudancas.map((m) => (
                <Link
                  key={m.id}
                  href={`/app/mudanca?id=${m.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">
                      {m.enderecoOrigem} → {m.enderecoDestino}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.dataDesejada ? formatDate(m.dataDesejada) : "Sem data"} ·{" "}
                      {m._count.cotacoes} cotações
                    </p>
                  </div>
                  <Badge variant={statusVariant[m.status]}>
                    {statusLabels[m.status]}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
