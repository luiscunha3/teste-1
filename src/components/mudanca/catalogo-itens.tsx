"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Armchair,
  BedDouble,
  CookingPot,
  Monitor,
  Package,
  Refrigerator,
  Sofa,
  Tv,
  Search,
} from "lucide-react";

export interface CatalogoItem {
  id: string;
  nome: string;
  categoria: string;
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
  pesoKg: number;
  volumeM3: number;
}

const categoriaIcons: Record<string, React.ElementType> = {
  quarto: BedDouble,
  cozinha: CookingPot,
  sala: Sofa,
  escritorio: Monitor,
  caixas: Package,
};

const categorias = ["todos", "quarto", "cozinha", "sala", "escritorio", "caixas"];

interface CatalogoItensProps {
  itens: CatalogoItem[];
  onAddItem: (item: CatalogoItem) => void;
}

export function CatalogoItens({ itens, onAddItem }: CatalogoItensProps) {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");

  const itensFiltrados = itens.filter((item) => {
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaSelecionada === "todos" || item.categoria === categoriaSelecionada;
    return matchBusca && matchCategoria;
  });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar item..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex gap-1 flex-wrap">
        {categorias.map((cat) => (
          <Badge
            key={cat}
            variant={categoriaSelecionada === cat ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
        {itensFiltrados.map((item) => {
          const Icon = categoriaIcons[item.categoria] || Package;
          return (
            <button
              key={item.id}
              onClick={() => onAddItem(item)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg border bg-card hover:bg-muted transition-colors text-center"
            >
              <Icon className="h-8 w-8 text-primary" />
              <span className="text-xs font-medium">{item.nome}</span>
              <span className="text-[10px] text-muted-foreground">
                {item.volumeM3.toFixed(2)} m³ · {item.pesoKg} kg
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
