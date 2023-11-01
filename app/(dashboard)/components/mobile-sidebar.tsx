import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { List } from "lucide-react";
import SideBar from "./side-bar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-60 transition">
        <List />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-green-600">
        <SheetClose asChild>
          <SideBar />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
