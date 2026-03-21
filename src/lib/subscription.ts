import type { User } from "@prisma/client";

export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  return user.plan === "TRIAL" && !!user.trialEndsAt && user.trialEndsAt > new Date();
}

export function isSubscribed(
  user: Pick<User, "plan" | "stripeCurrentPeriodEnd">
): boolean {
  return (
    user.plan === "PRO" &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd > new Date()
  );
}

export function hasAccess(
  user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">
): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(user: Pick<User, "trialEndsAt">): number {
  if (!user.trialEndsAt) return 0;
  const diff = user.trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    obrasAtivas: 1,
    etapasPorObra: 10,
    materiaisPorObra: 20,
    trabalhadoresPorObra: 5,
    relatoriosAvancados: false,
  },
  TRIAL: {
    obrasAtivas: Infinity,
    etapasPorObra: Infinity,
    materiaisPorObra: Infinity,
    trabalhadoresPorObra: Infinity,
    relatoriosAvancados: true,
  },
  PRO: {
    obrasAtivas: Infinity,
    etapasPorObra: Infinity,
    materiaisPorObra: Infinity,
    trabalhadoresPorObra: Infinity,
    relatoriosAvancados: true,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export function checkUsageLimit(
  plan: PlanType,
  resource: keyof (typeof PLAN_LIMITS)["FREE"],
  currentUsage: number
): { allowed: boolean; limit: number } {
  const limit = PLAN_LIMITS[plan][resource];
  return {
    allowed: typeof limit === "boolean" ? limit : currentUsage < limit,
    limit: typeof limit === "boolean" ? (limit ? 1 : 0) : limit,
  };
}
