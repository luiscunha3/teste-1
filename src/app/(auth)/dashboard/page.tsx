import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, HardHat, Users, Package } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const obras = await db.obra.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { etapas: true, materiais: true, equipes: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  const stats = {
    total: obras.length,
    ativas: obras.filter((o) => !["CONCLUIDA", "CANCELADA"].includes(o.status)).length,
    equipes: obras.reduce((acc, o) => acc + o._count.equipes, 0),
  };

  const statusLabels: Record<string, string> = {
    PLANEJAMENTO: "Planejamento",
    EM_ANDAMENTO: "Em Andamento",
    PAUSADA: "Pausada",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada",
  };

  const statusVariant: Record<string, "default" | "secondary" | "success" | "destructive" | "warning" | "outline"> = {
    PLANEJAMENTO: "outline",
    EM_ANDAMENTO: "warning",
    PAUSADA: "secondary",
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
          <Link href="/app/obras">
            <Plus className="h-4 w-4 mr-2" />
            Nova Obra
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Obras</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <HardHat className="h-5 w-5 text-primary" />
              {stats.total}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Obras Ativas</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              {stats.ativas}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Trabalhadores Alocados</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              {stats.equipes}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Obras</CardTitle>
          <CardDescription>Gerencie suas obras em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          {obras.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HardHat className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhuma obra cadastrada ainda.</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/app/obras">Criar sua primeira obra</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {obras.map((o) => (
                <Link
                  key={o.id}
                  href={`/app/obras?id=${o.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{o.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.cidade}, {o.estado} ·{" "}
                      {o.dataInicio ? formatDate(o.dataInicio) : "Sem data de início"} ·{" "}
                      {o._count.etapas} etapas · {o._count.equipes} trabalhadores
                    </p>
                  </div>
                  <Badge variant={statusVariant[o.status]}>
                    {statusLabels[o.status]}
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
