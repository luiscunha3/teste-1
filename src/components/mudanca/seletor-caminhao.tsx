"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";

export interface CaminhaoOption {
  id: string;
  nome: string;
  tipo: string;
  capacidadeM3: number;
  capacidadeKg: number;
  comprimentoCm: number;
  larguraCm: number;
  alturaCm: number;
}

interface SeletorCaminhaoProps {
  caminhoes: CaminhaoOption[];
  selecionadoId: string | null;
  volumeAtual: number;
  pesoAtual: number;
  onSelect: (id: string) => void;
}

export function SeletorCaminhao({
  caminhoes,
  selecionadoId,
  volumeAtual,
  pesoAtual,
  onSelect,
}: SeletorCaminhaoProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Selecione o Caminhão</h3>
      <div className="grid grid-cols-1 gap-3">
        {caminhoes.map((cam) => {
          const ocupacaoVolume = Math.min((volumeAtual / cam.capacidadeM3) * 100, 100);
          const ocupacaoPeso = Math.min((pesoAtual / cam.capacidadeKg) * 100, 100);
          const excedido = volumeAtual > cam.capacidadeM3 || pesoAtual > cam.capacidadeKg;
          const selecionado = selecionadoId === cam.id;

          return (
            <button
              key={cam.id}
              onClick={() => onSelect(cam.id)}
              className={cn(
                "flex flex-col gap-2 p-4 rounded-lg border transition-all text-left",
                selecionado
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">{cam.nome}</span>
                </div>
                {excedido && <Badge variant="destructive">Excedido</Badge>}
              </div>

              <div className="space-y-2 w-full">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Volume</span>
                    <span>
                      {volumeAtual.toFixed(1)} / {cam.capacidadeM3} m³
                    </span>
                  </div>
                  <Progress
                    value={ocupacaoVolume}
                    className={cn("h-2", excedido && "[&>div]:bg-destructive")}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Peso</span>
                    <span>
                      {pesoAtual.toFixed(0)} / {cam.capacidadeKg} kg
                    </span>
                  </div>
                  <Progress
                    value={ocupacaoPeso}
                    className={cn("h-2", excedido && "[&>div]:bg-destructive")}
                  />
                </div>
              </div>

              <div className="text-[10px] text-muted-foreground">
                {cam.comprimentoCm}×{cam.larguraCm}×{cam.alturaCm} cm
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
