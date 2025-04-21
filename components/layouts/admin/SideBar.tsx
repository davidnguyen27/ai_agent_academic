"use client";

import { useState } from "react";
import {
  Home,
  GraduationCap,
  Users,
  BookOpen,
  Settings,
  UserCircle,
  Menu,
  BookOpenText,
  Sheet,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { label: "Students", icon: GraduationCap, href: "/admin/student" },
  { label: "Subjects", icon: BookOpenText, href: "/admin/subject" },
  { label: "Curriculums", icon: Sheet, href: "/admin/curriculum" },
  { label: "Assessments", icon: ClipboardCheck, href: "/admin/assessment" },
  { label: "Materials", icon: Users, href: "/admin/material" },
  { label: "Account", icon: UserCircle, href: "#" },
  { label: "Subjects", icon: BookOpen, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

export function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`h-screen bg-blue-500 text-white p-3 transition-all duration-300 ${collapsed ? "w-17" : "w-56"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-xl font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-full opacity-100"
          }`}
        >
          Academic Activity
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-blue-500"
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-all
                ${isActive ? "bg-white text-blue-600 font-semibold" : "hover:bg-white hover:text-blue-600"}
              `}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              <span
                className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  collapsed ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
