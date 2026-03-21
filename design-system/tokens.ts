// Design System Tokens — Single Source of Truth
// MudaFácil: "Arraste seus móveis, escolha o caminhão e mude sem estresse"

export const colors = {
  // Brand
  primary: "#2563EB",        // azul confiança
  "primary-foreground": "#FFFFFF",
  accent: "#F59E0B",         // amarelo/âmbar — remete a caminhão de mudança
  "accent-foreground": "#1C1917",

  // Surfaces
  background: "#F8FAFC",     // cinza quase branco
  foreground: "#0F172A",
  card: "#FFFFFF",
  "card-foreground": "#0F172A",
  popover: "#FFFFFF",
  "popover-foreground": "#0F172A",

  // UI
  muted: "#F1F5F9",
  "muted-foreground": "#64748B",
  secondary: "#E2E8F0",
  "secondary-foreground": "#0F172A",
  border: "#E2E8F0",
  input: "#E2E8F0",
  ring: "#2563EB",

  // Semantic
  destructive: "#EF4444",
  "destructive-foreground": "#FFFFFF",
  success: "#22C55E",
  "success-foreground": "#FFFFFF",
  warning: "#F59E0B",
  "warning-foreground": "#1C1917",
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const spacing = {
  sidebar: "16rem",
  "sidebar-collapsed": "4rem",
} as const;

export const typography = {
  "font-sans": "'Inter', system-ui, -apple-system, sans-serif",
  "font-mono": "'JetBrains Mono', ui-monospace, monospace",
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
