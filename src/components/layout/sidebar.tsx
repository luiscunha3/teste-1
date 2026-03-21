"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, HardHat, Package, Users, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/obras", label: "Minhas Obras", icon: HardHat },
  { href: "/app/materiais", label: "Materiais", icon: Package },
  { href: "/app/equipe", label: "Equipe", icon: Users },
  { href: "/settings/billing", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <HardHat className="h-5 w-5 text-primary" />
        <span className="font-semibold">Construção Civil</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
