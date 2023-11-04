"use client"

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface SideBarLinkProps {
  label: string;
  link: string;
  locked: boolean;
}

export default function CourseSideBarLink({
  label,
  link,
  locked
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
        "group flex flex-row w-full items-center rounded-md text-white/70 transition-all",
        !locked && "hover:text-white hover:bg-green-950/20",
        isActive && "text-white bg-green-950/20",
        locked && "bg-green-950"
      )}
    >
      <div className="flex items-center gap-x-2 py-2 px-2">
        <p>{label}</p>
      </div>
    </button>
  );
}
