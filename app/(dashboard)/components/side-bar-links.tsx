"use client";

import { BarChart4, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import SideBarLink from "./side-bar-link";

const studentLinks = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherLinks = [
  {
    icon: List,
    label: "Dashboard",
    href: "/teacher/courses",
  },
  {
    icon: BarChart4,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export default function SideBarLinks() {
  const pathname = usePathname();

  const inTeacherMode = pathname?.includes("teacher");

  const routes = inTeacherMode ? teacherLinks : studentLinks;

  return (
    <div className="flex flex-col w-full px-6 mt-5 gap-y-2">
      {routes.map((route) => (
        <SideBarLink
          key={route.href}
          icon={route.icon}
          label={route.label}
          link={route.href}
        />
      ))}
    </div>
  );
}
