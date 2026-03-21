"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const categorias = [
  { nome: "Cimento", unidade: "saco 50kg", icon: "🧱" },
  { nome: "Areia", unidade: "m³", icon: "⏳" },
  { nome: "Brita", unidade: "m³", icon: "🪨" },
  { nome: "Tijolo", unidade: "unidade", icon: "🧱" },
  { nome: "Ferro", unidade: "barra 12m", icon: "🔩" },
  { nome: "Madeira", unidade: "metro", icon: "🪵" },
  { nome: "Elétrica", unidade: "unidade", icon: "⚡" },
  { nome: "Hidráulica", unidade: "unidade", icon: "🚰" },
  { nome: "Acabamento", unidade: "m²", icon: "🎨" },
];

export default function MateriaisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Materiais</h1>
        <p className="text-muted-foreground text-sm">
          Controle o estoque e compras de materiais das suas obras
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <Card key={cat.nome} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{cat.icon}</div>
              <div>
                <p className="font-medium">{cat.nome}</p>
                <p className="text-xs text-muted-foreground">Unidade: {cat.unidade}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Materiais por Obra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Selecione uma obra para ver os materiais alocados.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
