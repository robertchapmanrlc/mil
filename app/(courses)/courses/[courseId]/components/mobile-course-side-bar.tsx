import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
import CourseSideBar from "./course-side-bar";
import { Chapter } from "@prisma/client";

interface MobileCourseSidebarProps {
  chapters: Chapter[];
}

export default function MobileCourseSidebar({ chapters } : MobileCourseSidebarProps) {

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-60 transition">
        <List />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-green-600">
        <SheetClose asChild>
          <CourseSideBar chapters={chapters} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
