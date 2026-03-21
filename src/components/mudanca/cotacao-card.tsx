"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, Calendar } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CotacaoCardProps {
  transportadoraNome: string;
  transportadoraLogo?: string;
  notaMedia: number;
  totalAvaliacoes: number;
  precoCentavos: number;
  dataDisponivel: string;
  seguroIncluso: boolean;
  onSelecionar: () => void;
}

export function CotacaoCard({
  transportadoraNome,
  notaMedia,
  totalAvaliacoes,
  precoCentavos,
  dataDisponivel,
  seguroIncluso,
  onSelecionar,
}: CotacaoCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{transportadoraNome}</h4>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium">{notaMedia.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs">({totalAvaliacoes})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(dataDisponivel)}</span>
          </div>
          {seguroIncluso && (
            <Badge variant="success" className="text-[10px]">
              <Shield className="h-3 w-3 mr-1" />
              Seguro incluso
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(precoCentavos)}
          </p>
          <Button size="sm" onClick={onSelecionar}>
            Selecionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
