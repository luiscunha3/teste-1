import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { etapaCreateSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const obraId = req.nextUrl.searchParams.get("obraId");
  if (!obraId) {
    return NextResponse.json({ error: "obraId é obrigatório" }, { status: 400 });
  }

  const etapas = await db.etapa.findMany({
    where: { obraId },
    orderBy: { ordem: "asc" },
  });

  return NextResponse.json(etapas);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = etapaCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const etapa = await db.etapa.create({
    data: {
      obraId: parsed.data.obraId,
      nome: parsed.data.nome,
      descricao: parsed.data.descricao ?? null,
      ordem: parsed.data.ordem,
      dataInicio: parsed.data.dataInicio ? new Date(parsed.data.dataInicio) : null,
      dataPrevisaoFim: parsed.data.dataPrevisaoFim ? new Date(parsed.data.dataPrevisaoFim) : null,
    },
  });

  return NextResponse.json(etapa, { status: 201 });
}
