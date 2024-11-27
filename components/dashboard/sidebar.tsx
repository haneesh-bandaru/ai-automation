"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  PieChart,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Projects',
    icon: FileText,
    href: '/dashboard/projects',
    color: "text-sky-500"
  },
  {
    label: 'Team',
    icon: Users,
    href: '/dashboard/team',
    color: "text-sky-500"
  },
  {
    label: 'Analytics',
    icon: PieChart,
    href: '/dashboard/analytics',
    color: "text-sky-500"
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: "text-sky-500"
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold text-sky-600">TaskAI</h1>
        </Link>
        <ScrollArea className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-sky-600 hover:bg-sky-100/50 rounded-lg transition",
                  pathname === route.href ? "text-sky-600 bg-sky-100" : "text-zinc-600"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start text-zinc-600 hover:text-red-600 hover:bg-red-100">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};