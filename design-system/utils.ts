import { colors, radius, spacing, typography } from "./tokens";

export function tokenKeyToCssVar(key: string): string {
  return `--${key}`;
}

export function sidebarKeyToCssVar(key: string): string {
  return `--sidebar-${key}`;
}

export function generateRootVars(): string {
  const lines: string[] = [":root {"];

  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --${key}: ${value};`);
  }

  for (const [key, value] of Object.entries(radius)) {
    lines.push(`  --radius-${key}: ${value};`);
  }

  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --${key}: ${value};`);
  }

  for (const [key, value] of Object.entries(typography)) {
    lines.push(`  --${key}: ${value};`);
  }

  lines.push("}");
  return lines.join("\n");
}
