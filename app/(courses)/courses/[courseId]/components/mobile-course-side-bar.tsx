import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
import CourseSideBar from "./course-side-bar";
import { Chapter } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCoursePurchase } from "@/actions/get-purchases";
import Logo from "@/components/logo";
import CourseSideBarLink from "./course-side-bar-item";

interface MobileCourseSidebarProps {
  chapters: Chapter[];
}

export default async function MobileCourseSidebar({ chapters } : MobileCourseSidebarProps) {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await getCoursePurchase(chapters[0].courseId, userId);


  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-60 transition">
        <List />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-green-600">
        <SheetClose asChild>
          <div className="h-full flex flex-col items-center bg-green-600 overflow-y-auto shadow-sm border-r">
            <div className="flex items-center pt-3">
              <Logo />
              <h1 className="text-lg text-white">Music Instrument Learning</h1>
            </div>
            <div className="flex flex-col items-start w-full px-5 pt-5 gap-y-2">
              {chapters.map((chapter) => (
                <CourseSideBarLink
                  key={chapter.id}
                  label={chapter.title}
                  link={`/courses/${chapter.courseId}/chapters/${chapter.id}`}
                  locked={!chapter.isFree && !purchase}
                />
              ))}
            </div>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
