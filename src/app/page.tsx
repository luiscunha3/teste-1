import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import {
  Truck,
  GripVertical,
  Filter,
  Package,
  ClipboardList,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: GripVertical,
    title: "Canvas de Carga Interativo",
    description:
      "Arraste ícones de móveis para dentro de um container virtual. Cada item tem dimensão proporcional real e encaixa visualmente no espaço disponível.",
  },
  {
    icon: Truck,
    title: "Seletor de Caminhão",
    description:
      "Compare visualmente 4 tamanhos (Fiorino, HR, 3/4, Baú) com barra de ocupação em tempo real conforme você adiciona itens.",
  },
  {
    icon: Filter,
    title: "Filtros de Cotação",
    description:
      "Filtre transportadoras por preço, nota, data disponível, seguro incluso e tipo de veículo. Ordene e compare lado a lado.",
  },
  {
    icon: Package,
    title: "Catálogo Visual de Itens",
    description:
      "Biblioteca com 40+ ícones categorizados (quarto, cozinha, sala, escritório, caixas) com peso e volume pré-estimados.",
  },
  {
    icon: ClipboardList,
    title: "Resumo Inteligente da Carga",
    description:
      "Painel lateral com volume total (m³), peso estimado, percentual de ocupação e alerta se estiver acima da capacidade.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container py-20 md:py-32 text-center">
        <Badge variant="secondary" className="mb-6">
          14 dias grátis — sem cartão de crédito
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
          Arraste seus móveis, escolha o caminhão e{" "}
          <span className="text-primary">mude sem estresse</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Monte visualmente a carga da sua mudança com drag & drop, compare
          tamanhos de caminhão em tempo real e receba cotações instantâneas de
          transportadoras avaliadas.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/login">
              Começar Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">Ver Preços</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20" id="features">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Funcionalidades</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Tudo que você precisa para planejar sua mudança
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="container py-20 bg-muted/50 rounded-2xl" id="pricing">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Simples e acessível</h2>
          <p className="mt-2 text-muted-foreground">
            Comece grátis, faça upgrade quando quiser
          </p>
        </div>
        <div className="max-w-sm mx-auto">
          <Card className="border-primary shadow-lg">
            <CardContent className="p-8 text-center space-y-4">
              <Badge>PRO</Badge>
              <div>
                <span className="text-5xl font-bold">R$ 29,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-2 text-sm text-left">
                {[
                  "Mudanças ilimitadas",
                  "Itens ilimitados no canvas",
                  "Cotações ilimitadas",
                  "Filtros avançados",
                  "Suporte prioritário",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg" asChild>
                <Link href="/login">Começar Trial Grátis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12 text-center text-sm text-muted-foreground border-t mt-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Truck className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">MudaFácil</span>
        </div>
        <p>&copy; {new Date().getFullYear()} MudaFácil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
