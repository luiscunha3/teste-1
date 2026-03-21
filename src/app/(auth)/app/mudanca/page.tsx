"use client";

import { useState, useCallback } from "react";
import { CatalogoItens, type CatalogoItem } from "@/components/mudanca/catalogo-itens";
import { SeletorCaminhao, type CaminhaoOption } from "@/components/mudanca/seletor-caminhao";
import { CanvasCarga } from "@/components/mudanca/canvas-carga";
import { ResumoCarga } from "@/components/mudanca/resumo-carga";
import { CotacaoCard } from "@/components/mudanca/cotacao-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search } from "lucide-react";

// Default catalog items
const defaultItens: CatalogoItem[] = [
  { id: "1", nome: "Geladeira", categoria: "cozinha", larguraCm: 70, alturaCm: 180, profundidadeCm: 70, pesoKg: 60, volumeM3: 0.88 },
  { id: "2", nome: "Fogão", categoria: "cozinha", larguraCm: 60, alturaCm: 90, profundidadeCm: 60, pesoKg: 40, volumeM3: 0.32 },
  { id: "3", nome: "Micro-ondas", categoria: "cozinha", larguraCm: 50, alturaCm: 30, profundidadeCm: 40, pesoKg: 12, volumeM3: 0.06 },
  { id: "4", nome: "Máquina de Lavar", categoria: "cozinha", larguraCm: 60, alturaCm: 85, profundidadeCm: 60, pesoKg: 50, volumeM3: 0.31 },
  { id: "5", nome: "Cama Casal", categoria: "quarto", larguraCm: 140, alturaCm: 45, profundidadeCm: 190, pesoKg: 40, volumeM3: 1.20 },
  { id: "6", nome: "Cama Solteiro", categoria: "quarto", larguraCm: 90, alturaCm: 45, profundidadeCm: 190, pesoKg: 25, volumeM3: 0.77 },
  { id: "7", nome: "Guarda-Roupa", categoria: "quarto", larguraCm: 160, alturaCm: 200, profundidadeCm: 55, pesoKg: 70, volumeM3: 1.76 },
  { id: "8", nome: "Cômoda", categoria: "quarto", larguraCm: 80, alturaCm: 80, profundidadeCm: 45, pesoKg: 25, volumeM3: 0.29 },
  { id: "9", nome: "Criado-Mudo", categoria: "quarto", larguraCm: 45, alturaCm: 55, profundidadeCm: 40, pesoKg: 8, volumeM3: 0.10 },
  { id: "10", nome: "Sofá 3 Lugares", categoria: "sala", larguraCm: 200, alturaCm: 85, profundidadeCm: 90, pesoKg: 45, volumeM3: 1.53 },
  { id: "11", nome: "Sofá 2 Lugares", categoria: "sala", larguraCm: 150, alturaCm: 85, profundidadeCm: 90, pesoKg: 35, volumeM3: 1.15 },
  { id: "12", nome: "Mesa de Centro", categoria: "sala", larguraCm: 100, alturaCm: 45, profundidadeCm: 60, pesoKg: 15, volumeM3: 0.27 },
  { id: "13", nome: "Rack TV", categoria: "sala", larguraCm: 160, alturaCm: 50, profundidadeCm: 40, pesoKg: 20, volumeM3: 0.32 },
  { id: "14", nome: "TV 55\"", categoria: "sala", larguraCm: 130, alturaCm: 80, profundidadeCm: 10, pesoKg: 15, volumeM3: 0.10 },
  { id: "15", nome: "Poltrona", categoria: "sala", larguraCm: 80, alturaCm: 90, profundidadeCm: 80, pesoKg: 20, volumeM3: 0.58 },
  { id: "16", nome: "Mesa Escritório", categoria: "escritorio", larguraCm: 120, alturaCm: 75, profundidadeCm: 60, pesoKg: 20, volumeM3: 0.54 },
  { id: "17", nome: "Cadeira Escritório", categoria: "escritorio", larguraCm: 60, alturaCm: 110, profundidadeCm: 60, pesoKg: 12, volumeM3: 0.40 },
  { id: "18", nome: "Estante", categoria: "escritorio", larguraCm: 80, alturaCm: 180, profundidadeCm: 30, pesoKg: 25, volumeM3: 0.43 },
  { id: "19", nome: "Mesa Jantar 4L", categoria: "sala", larguraCm: 120, alturaCm: 75, profundidadeCm: 80, pesoKg: 30, volumeM3: 0.72 },
  { id: "20", nome: "Cadeira Jantar", categoria: "sala", larguraCm: 45, alturaCm: 90, profundidadeCm: 45, pesoKg: 5, volumeM3: 0.18 },
  { id: "21", nome: "Caixa P", categoria: "caixas", larguraCm: 35, alturaCm: 30, profundidadeCm: 30, pesoKg: 5, volumeM3: 0.03 },
  { id: "22", nome: "Caixa M", categoria: "caixas", larguraCm: 50, alturaCm: 40, profundidadeCm: 40, pesoKg: 10, volumeM3: 0.08 },
  { id: "23", nome: "Caixa G", categoria: "caixas", larguraCm: 60, alturaCm: 50, profundidadeCm: 50, pesoKg: 15, volumeM3: 0.15 },
  { id: "24", nome: "Colchão Casal", categoria: "quarto", larguraCm: 140, alturaCm: 25, profundidadeCm: 190, pesoKg: 20, volumeM3: 0.67 },
  { id: "25", nome: "Colchão Solteiro", categoria: "quarto", larguraCm: 90, alturaCm: 20, profundidadeCm: 190, pesoKg: 12, volumeM3: 0.34 },
];

const defaultCaminhoes: CaminhaoOption[] = [
  { id: "c1", nome: "Fiorino", tipo: "fiorino", capacidadeM3: 1.5, capacidadeKg: 600, comprimentoCm: 150, larguraCm: 120, alturaCm: 110 },
  { id: "c2", nome: "HR / Furgão", tipo: "hr", capacidadeM3: 6, capacidadeKg: 1500, comprimentoCm: 290, larguraCm: 170, alturaCm: 170 },
  { id: "c3", nome: "Caminhão 3/4", tipo: "tresQuartos", capacidadeM3: 15, capacidadeKg: 3500, comprimentoCm: 450, larguraCm: 220, alturaCm: 220 },
  { id: "c4", nome: "Caminhão Baú", tipo: "bau", capacidadeM3: 25, capacidadeKg: 6000, comprimentoCm: 600, larguraCm: 240, alturaCm: 250 },
];

interface CanvasItemState {
  id: string;
  itemId: string;
  nome: string;
  larguraCm: number;
  profundidadeCm: number;
  pesoKg: number;
  volumeM3: number;
  x: number;
  y: number;
  rotacao: number;
}

export default function MudancaPage() {
  const [canvasItens, setCanvasItens] = useState<CanvasItemState[]>([]);
  const [caminhaoId, setCaminhaoId] = useState<string | null>("c2");

  const volumeTotal = canvasItens.reduce((acc, i) => acc + i.volumeM3, 0);
  const pesoTotal = canvasItens.reduce((acc, i) => acc + i.pesoKg, 0);
  const caminhaoSelecionado = defaultCaminhoes.find((c) => c.id === caminhaoId);

  const handleAddItem = useCallback((item: CatalogoItem) => {
    const newItem: CanvasItemState = {
      id: `canvas-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      itemId: item.id,
      nome: item.nome,
      larguraCm: item.larguraCm,
      profundidadeCm: item.profundidadeCm,
      pesoKg: item.pesoKg,
      volumeM3: item.volumeM3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotacao: 0,
    };
    setCanvasItens((prev) => [...prev, newItem]);
  }, []);

  const handleMoveItem = useCallback((id: string, x: number, y: number) => {
    setCanvasItens((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCanvasItens((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Nova Mudança</h1>
          <p className="text-muted-foreground text-sm">
            Monte sua carga visualmente e receba cotações
          </p>
        </div>
        <Badge variant="secondary">{canvasItens.length} itens</Badge>
      </div>

      {/* Address inputs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Origem</label>
              <Input placeholder="Endereço de origem" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Destino</label>
              <Input placeholder="Endereço de destino" />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Cotar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Catalog */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Catálogo de Itens</CardTitle>
            </CardHeader>
            <CardContent>
              <CatalogoItens itens={defaultItens} onAddItem={handleAddItem} />
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-6">
          {caminhaoSelecionado && (
            <CanvasCarga
              containerLarguraCm={caminhaoSelecionado.larguraCm}
              containerComprimentoCm={caminhaoSelecionado.comprimentoCm}
              itens={canvasItens}
              onMoveItem={handleMoveItem}
              onRemoveItem={handleRemoveItem}
              scale={0.4}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <ResumoCarga
            volumeTotal={volumeTotal}
            pesoTotal={pesoTotal}
            totalItens={canvasItens.length}
            caminhaoNome={caminhaoSelecionado?.nome}
            capacidadeM3={caminhaoSelecionado?.capacidadeM3}
            capacidadeKg={caminhaoSelecionado?.capacidadeKg}
          />
          <SeletorCaminhao
            caminhoes={defaultCaminhoes}
            selecionadoId={caminhaoId}
            volumeAtual={volumeTotal}
            pesoAtual={pesoTotal}
            onSelect={setCaminhaoId}
          />
        </div>
      </div>
    </div>
  );
}
