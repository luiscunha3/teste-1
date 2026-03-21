import { z } from "zod";

export const obraCreateSchema = z.object({
  nome: z.string().min(3, "Nome da obra é obrigatório"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().length(2, "Use a sigla do estado (ex: SP)"),
  areaM2: z.number().positive().optional(),
  orcamentoCentavos: z.number().int().nonnegative().optional(),
  dataInicio: z.string().datetime().optional(),
  dataPrevisaoFim: z.string().datetime().optional(),
});

export const etapaCreateSchema = z.object({
  obraId: z.string().cuid(),
  nome: z.string().min(2, "Nome da etapa é obrigatório"),
  descricao: z.string().optional(),
  ordem: z.number().int().nonnegative(),
  dataInicio: z.string().datetime().optional(),
  dataPrevisaoFim: z.string().datetime().optional(),
});

export const materialCreateSchema = z.object({
  nome: z.string().min(2, "Nome do material é obrigatório"),
  categoria: z.enum([
    "CIMENTO",
    "AREIA",
    "BRITA",
    "TIJOLO",
    "FERRO",
    "MADEIRA",
    "ELETRICA",
    "HIDRAULICA",
    "ACABAMENTO",
    "OUTROS",
  ]),
  unidade: z.string().min(1),
  precoUnitarioCentavos: z.number().int().nonnegative().optional(),
});

export const trabalhadorCreateSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório"),
  funcao: z.string().min(3, "Função é obrigatória"),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
  valorDiaCentavos: z.number().int().nonnegative().optional(),
});

export type ObraCreateInput = z.infer<typeof obraCreateSchema>;
export type EtapaCreateInput = z.infer<typeof etapaCreateSchema>;
export type MaterialCreateInput = z.infer<typeof materialCreateSchema>;
export type TrabalhadorCreateInput = z.infer<typeof trabalhadorCreateSchema>;
