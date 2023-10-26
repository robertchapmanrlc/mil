"use client"

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface SideBarLinkProps {
  label: string;
  link: string;
}

export default function CourseSideBarLink({
  label,
  link,
}: SideBarLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && link === "/") ||
    pathname === link ||
    pathname.startsWith(`${link}/`);

  const onClick = () => {
    router.push(link);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-row w-full items-center rounded-md text-white/70 hover:text-white  hover:bg-green-950/20 transition-all",
        isActive && "text-white bg-green-950/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-2 px-2">
        <p>{label}</p>
      </div>
    </button>
  );
}
