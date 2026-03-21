import { z } from "zod";

export const mudancaCreateSchema = z.object({
  enderecoOrigem: z.string().min(5, "Endereço de origem é obrigatório"),
  enderecoDestino: z.string().min(5, "Endereço de destino é obrigatório"),
  dataDesejada: z.string().datetime().optional(),
});

export const cargaItemSchema = z.object({
  itemId: z.string().cuid(),
  x: z.number(),
  y: z.number(),
  rotacao: z.number().default(0),
});

export const cargaLayoutSchema = z.object({
  mudancaId: z.string().cuid(),
  caminhaoId: z.string().cuid(),
  itens: z.array(cargaItemSchema),
});

export const cotacaoFilterSchema = z.object({
  precoMin: z.number().optional(),
  precoMax: z.number().optional(),
  notaMinima: z.number().min(0).max(5).optional(),
  seguroIncluso: z.boolean().optional(),
  tipoCaminhao: z.string().optional(),
  ordenarPor: z.enum(["preco", "nota", "data"]).default("preco"),
});

export type MudancaCreateInput = z.infer<typeof mudancaCreateSchema>;
export type CargaLayoutInput = z.infer<typeof cargaLayoutSchema>;
export type CotacaoFilterInput = z.infer<typeof cotacaoFilterSchema>;
