# Construção Civil

Sistema de gestão de obras e construção civil. Controle de projetos, orçamentos, materiais, equipes e cronogramas.

## Funcionalidades

- **Obras**: Cadastro e acompanhamento de obras
- **Orçamentos**: Gestão de orçamentos por obra
- **Materiais**: Controle de estoque e compras de materiais
- **Equipes**: Gestão de trabalhadores e equipes
- **Cronograma**: Planejamento e acompanhamento de etapas
- **Dashboard**: Visão geral de todas as obras

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **UI**: Tailwind CSS + Radix UI
- **Pagamentos**: Stripe

## Getting Started

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Gerar Prisma Client
npm run db:generate

# Aplicar schema no banco
npm run db:push

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
