import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { obraCreateSchema } from "@/lib/validations";
import { checkUsageLimit } from "@/lib/subscription";
import type { Plan } from "@prisma/client";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const obras = await db.obra.findMany({
    where: { userId: session.user.id },
    include: {
      etapas: { orderBy: { ordem: "asc" } },
      _count: { select: { materiais: true, equipes: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(obras);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  const activeObras = await db.obra.count({
    where: {
      userId: session.user.id,
      status: { notIn: ["CONCLUIDA", "CANCELADA"] },
    },
  });

  const { allowed } = checkUsageLimit(user.plan as Plan, "obrasAtivas", activeObras);
  if (!allowed) {
    return NextResponse.json(
      { error: "Limite de obras ativas atingido. Faça upgrade para PRO." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = obraCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const obra = await db.obra.create({
    data: {
      userId: session.user.id,
      nome: parsed.data.nome,
      endereco: parsed.data.endereco,
      cidade: parsed.data.cidade,
      estado: parsed.data.estado,
      areaM2: parsed.data.areaM2 ?? null,
      orcamentoCentavos: parsed.data.orcamentoCentavos ?? 0,
      dataInicio: parsed.data.dataInicio ? new Date(parsed.data.dataInicio) : null,
      dataPrevisaoFim: parsed.data.dataPrevisaoFim ? new Date(parsed.data.dataPrevisaoFim) : null,
    },
  });

  return NextResponse.json(obra, { status: 201 });
}
