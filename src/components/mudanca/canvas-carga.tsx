"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface CanvasItem {
  id: string;
  itemId: string;
  nome: string;
  larguraCm: number;
  profundidadeCm: number;
  x: number;
  y: number;
  rotacao: number;
}

interface CanvasCargaProps {
  containerLarguraCm: number;
  containerComprimentoCm: number;
  itens: CanvasItem[];
  onMoveItem: (id: string, x: number, y: number) => void;
  onRemoveItem: (id: string) => void;
  scale?: number;
}

export function CanvasCarga({
  containerLarguraCm,
  containerComprimentoCm,
  itens,
  onMoveItem,
  onRemoveItem,
  scale = 0.5,
}: CanvasCargaProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const handleMouseDown = (itemId: string) => {
    setDragging(itemId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    onMoveItem(dragging, Math.round(x), Math.round(y));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Canvas de Carga</h3>
      <div
        ref={canvasRef}
        className="relative border-2 border-dashed border-primary/30 rounded-lg bg-muted/50 overflow-hidden cursor-crosshair"
        style={{
          width: containerLarguraCm * scale,
          height: containerComprimentoCm * scale,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: `${50 * scale}px ${50 * scale}px`,
          }}
        />

        {itens.map((item) => (
          <div
            key={item.id}
            className={cn(
              "absolute flex flex-col items-center justify-center rounded border text-[10px] font-medium cursor-grab select-none transition-shadow",
              dragging === item.id
                ? "shadow-lg ring-2 ring-primary z-10 bg-primary/20 border-primary"
                : "bg-accent/30 border-accent hover:shadow-md"
            )}
            style={{
              left: item.x * scale,
              top: item.y * scale,
              width: item.larguraCm * scale,
              height: item.profundidadeCm * scale,
              transform: `rotate(${item.rotacao}deg)`,
            }}
            onMouseDown={() => handleMouseDown(item.id)}
            onDoubleClick={() => onRemoveItem(item.id)}
          >
            <Package className="h-3 w-3" />
            <span className="truncate max-w-full px-1">{item.nome}</span>
          </div>
        ))}

        {itens.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            Arraste itens do catálogo para cá
          </div>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground">
        Clique duplo para remover um item. Arraste para reposicionar.
      </p>
    </div>
  );
}
