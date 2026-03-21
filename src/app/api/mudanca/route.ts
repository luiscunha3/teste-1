import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mudancaCreateSchema } from "@/lib/validations";
import { checkUsageLimit } from "@/lib/subscription";
import type { Plan } from "@prisma/client";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const mudancas = await db.mudanca.findMany({
    where: { userId: session.user.id },
    include: { caminhao: true, cargaLayout: true, _count: { select: { cotacoes: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(mudancas);
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

  // Check plan limits
  const activeMudancas = await db.mudanca.count({
    where: {
      userId: session.user.id,
      status: { notIn: ["CONCLUIDA", "CANCELADA"] },
    },
  });

  const { allowed } = checkUsageLimit(user.plan as Plan, "mudancasAtivas", activeMudancas);
  if (!allowed) {
    return NextResponse.json(
      { error: "Limite de mudanças ativas atingido. Faça upgrade para PRO." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = mudancaCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const mudanca = await db.mudanca.create({
    data: {
      userId: session.user.id,
      enderecoOrigem: parsed.data.enderecoOrigem,
      enderecoDestino: parsed.data.enderecoDestino,
      dataDesejada: parsed.data.dataDesejada ? new Date(parsed.data.dataDesejada) : null,
    },
  });

  return NextResponse.json(mudanca, { status: 201 });
}
