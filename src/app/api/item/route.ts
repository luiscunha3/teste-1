import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const itens = await db.item.findMany({
    orderBy: [{ categoria: "asc" }, { nome: "asc" }],
  });

  return NextResponse.json(itens);
}
