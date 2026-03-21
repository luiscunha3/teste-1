"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, HardHat, MapPin, Calendar, BarChart3 } from "lucide-react";

interface NovaObra {
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  areaM2: string;
  orcamento: string;
}

const etapasDefault = [
  "Fundação",
  "Alvenaria",
  "Estrutura",
  "Cobertura",
  "Instalação Elétrica",
  "Instalação Hidráulica",
  "Reboco",
  "Piso",
  "Pintura",
  "Acabamento",
];

export default function ObrasPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NovaObra>({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    areaM2: "",
    orcamento: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minhas Obras</h1>
          <p className="text-muted-foreground text-sm">
            Cadastre e acompanhe suas obras de construção civil
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Obra
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HardHat className="h-5 w-5" />
              Cadastrar Nova Obra
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Nome da Obra</label>
                <Input
                  placeholder="Ex: Residência Silva"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Endereço</label>
                <Input
                  placeholder="Rua, número, bairro"
                  value={form.endereco}
                  onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Cidade</label>
                <Input
                  placeholder="Cidade"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Estado</label>
                <Input
                  placeholder="UF"
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Área (m²)</label>
                <Input
                  type="number"
                  placeholder="150"
                  value={form.areaM2}
                  onChange={(e) => setForm({ ...form, areaM2: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Orçamento (R$)</label>
                <Input
                  type="number"
                  placeholder="250000"
                  value={form.orcamento}
                  onChange={(e) => setForm({ ...form, orcamento: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Etapas da Obra
              </label>
              <div className="flex flex-wrap gap-2">
                {etapasDefault.map((etapa) => (
                  <Badge key={etapa} variant="secondary">
                    {etapa}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Etapas padrão serão adicionadas automaticamente. Você poderá personalizá-las depois.
              </p>
            </div>

            <div className="flex gap-2">
              <Button>Criar Obra</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!showForm && (
        <Card>
          <CardContent className="p-12 text-center">
            <HardHat className="mx-auto h-16 w-16 mb-4 opacity-30" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma obra cadastrada</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Comece cadastrando sua primeira obra para gerenciar orçamentos, materiais e equipes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto mt-6">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-8 w-8 opacity-50" />
                <span>Localização</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="h-8 w-8 opacity-50" />
                <span>Orçamento</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-8 w-8 opacity-50" />
                <span>Cronograma</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
