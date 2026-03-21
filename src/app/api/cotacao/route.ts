import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { checkUsageLimit } from "@/lib/subscription";
import type { Plan } from "@prisma/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const mudancaId = req.nextUrl.searchParams.get("mudancaId");
  if (!mudancaId) {
    return NextResponse.json({ error: "mudancaId é obrigatório" }, { status: 400 });
  }

  const ordenarPor = req.nextUrl.searchParams.get("ordenarPor") || "preco";

  const cotacoes = await db.cotacao.findMany({
    where: { mudancaId },
    include: { transportadora: true },
    orderBy:
      ordenarPor === "nota"
        ? { transportadora: { notaMedia: "desc" } }
        : ordenarPor === "data"
          ? { dataDisponivel: "asc" }
          : { precoCentavos: "asc" },
  });

  return NextResponse.json(cotacoes);
}
