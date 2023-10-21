import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface SideBarLinkProps {
  icon: LucideIcon;
  label: string;
  link: string;
}

export default function SideBarLink({ icon: Icon, label, link }: SideBarLinkProps) {

  const pathname = usePathname();

  const isActive = (pathname === '/' && link === '/') || (pathname === link);

  return (
    <button
      className={cn(
        "group flex flex-row w-full items-center rounded-md text-white/70 hover:text-white  hover:bg-green-950/20 transition-all",
        isActive && "text-white bg-green-950/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-2 px-2">
        <Icon
          size={30}
          className={cn(
            "text-white/70 group-hover:text-white transition-all",
            isActive && "text-white"
          )}
        />
        <p>{label}</p>
      </div>
    </button>
  );
}
