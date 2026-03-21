import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const materiais = await db.material.findMany({
    orderBy: [{ categoria: "asc" }, { nome: "asc" }],
  });

  return NextResponse.json(materiais);
}
