'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Kanban, Calendar, BarChart2, Settings, ClipboardList } from 'lucide-react';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: Kanban },
    { href: "/tasks", label: "Tasks", icon: ClipboardList },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/reports", label: "Reports", icon: BarChart2 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <nav className={cn("flex flex-col space-y-2 p-4", className)} {...props}>
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );
}
