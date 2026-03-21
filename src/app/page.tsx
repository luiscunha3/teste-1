import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import {
  HardHat,
  BarChart3,
  Users,
  Package,
  ClipboardList,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: HardHat,
    title: "Gestão de Obras",
    description:
      "Cadastre e acompanhe todas as suas obras em um só lugar. Controle status, prazos e progresso de cada etapa.",
  },
  {
    icon: BarChart3,
    title: "Orçamentos Detalhados",
    description:
      "Crie orçamentos completos por obra com controle de gastos em tempo real. Saiba exatamente quanto já foi gasto e quanto falta.",
  },
  {
    icon: Package,
    title: "Controle de Materiais",
    description:
      "Gerencie o estoque de materiais por obra. Acompanhe quantidades compradas, utilizadas e calcule custos automaticamente.",
  },
  {
    icon: Users,
    title: "Gestão de Equipes",
    description:
      "Cadastre trabalhadores, atribua a obras e controle a mão de obra. Acompanhe pedreiros, eletricistas, encanadores e mais.",
  },
  {
    icon: ClipboardList,
    title: "Cronograma de Etapas",
    description:
      "Planeje e acompanhe cada etapa da obra: fundação, alvenaria, elétrica, hidráulica, acabamento e mais.",
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
          Gerencie suas obras com{" "}
          <span className="text-primary">controle total</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Controle orçamentos, materiais, equipes e cronogramas de todas as suas
          obras de construção civil em uma plataforma simples e intuitiva.
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
            Tudo que você precisa para gerenciar suas obras
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
                <span className="text-5xl font-bold">R$ 49,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-2 text-sm text-left">
                {[
                  "Obras ilimitadas",
                  "Controle de materiais completo",
                  "Gestão de equipes ilimitada",
                  "Relatórios avançados",
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
          <HardHat className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Construção Civil</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Construção Civil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
