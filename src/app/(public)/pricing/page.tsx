import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    description: "Para testar a plataforma",
    features: [
      { text: "1 mudança ativa", included: true },
      { text: "Até 15 itens no canvas", included: true },
      { text: "3 cotações por mudança", included: true },
      { text: "Filtros avançados", included: false },
      { text: "Mudanças ilimitadas", included: false },
    ],
    cta: "Começar Grátis",
    highlighted: false,
  },
  {
    name: "PRO",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para quem vai mudar de verdade",
    features: [
      { text: "Mudanças ilimitadas", included: true },
      { text: "Itens ilimitados no canvas", included: true },
      { text: "Cotações ilimitadas", included: true },
      { text: "Filtros avançados", included: true },
      { text: "Suporte prioritário", included: true },
    ],
    cta: "Assinar PRO",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-20">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Preços</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Planos simples e transparentes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece grátis com 14 dias de trial completo. Sem cartão de crédito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-primary shadow-lg relative" : ""}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Mais popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
