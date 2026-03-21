"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users } from "lucide-react";

const funcoes = [
  "Mestre de Obras",
  "Pedreiro",
  "Servente",
  "Eletricista",
  "Encanador",
  "Pintor",
  "Carpinteiro",
  "Armador",
  "Azulejista",
  "Gesseiro",
];

export default function EquipePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equipe</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os trabalhadores das suas obras
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Trabalhador
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cadastrar Trabalhador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Nome</label>
                <Input placeholder="Nome completo" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Função</label>
                <Input placeholder="Ex: Pedreiro" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Telefone</label>
                <Input placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Valor/Dia (R$)</label>
                <Input type="number" placeholder="150" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button>Cadastrar</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Funções Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {funcoes.map((funcao) => (
              <Badge key={funcao} variant="secondary">
                {funcao}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-12 text-center">
          <Users className="mx-auto h-12 w-12 mb-4 opacity-30" />
          <p className="text-muted-foreground">Nenhum trabalhador cadastrado ainda.</p>
        </CardContent>
      </Card>
    </div>
  );
}
