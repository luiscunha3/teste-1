"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Package, Weight, Maximize } from "lucide-react";

interface ResumoCargaProps {
  volumeTotal: number;
  pesoTotal: number;
  totalItens: number;
  caminhaoNome?: string;
  capacidadeM3?: number;
  capacidadeKg?: number;
}

export function ResumoCarga({
  volumeTotal,
  pesoTotal,
  totalItens,
  caminhaoNome,
  capacidadeM3,
  capacidadeKg,
}: ResumoCargaProps) {
  const ocupacaoVolume = capacidadeM3 ? (volumeTotal / capacidadeM3) * 100 : 0;
  const ocupacaoPeso = capacidadeKg ? (pesoTotal / capacidadeKg) * 100 : 0;
  const excedido = ocupacaoVolume > 100 || ocupacaoPeso > 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          Resumo da Carga
          {excedido && (
            <Badge variant="destructive" className="text-[10px]">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Acima da capacidade
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <Package className="h-4 w-4 mx-auto text-muted-foreground" />
            <p className="text-lg font-bold">{totalItens}</p>
            <p className="text-[10px] text-muted-foreground">Itens</p>
          </div>
          <div>
            <Maximize className="h-4 w-4 mx-auto text-muted-foreground" />
            <p className="text-lg font-bold">{volumeTotal.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground">m³</p>
          </div>
          <div>
            <Weight className="h-4 w-4 mx-auto text-muted-foreground" />
            <p className="text-lg font-bold">{pesoTotal.toFixed(0)}</p>
            <p className="text-[10px] text-muted-foreground">kg</p>
          </div>
        </div>

        {caminhaoNome && capacidadeM3 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Caminhão: <span className="font-medium text-foreground">{caminhaoNome}</span>
            </p>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Ocupação</span>
                <span className={excedido ? "text-destructive font-medium" : ""}>
                  {ocupacaoVolume.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={Math.min(ocupacaoVolume, 100)}
                className={excedido ? "[&>div]:bg-destructive" : ""}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
