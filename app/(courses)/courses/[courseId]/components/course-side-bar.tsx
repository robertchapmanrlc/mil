
import Logo from "@/components/logo";
import { Chapter, Course } from "@prisma/client";
import CourseSideBarLink from "./course-side-bar-item";
import { getCoursePurchase } from "@/actions/get-purchases";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type CourseSideBarProps = {
  chapters: Chapter[];
}

export default async function CourseSideBar({ chapters }: CourseSideBarProps) {
  
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const purchase = await getCoursePurchase(chapters[0].courseId, userId);

  return (
    <div className="h-full flex flex-col items-center bg-green-600 overflow-y-auto shadow-sm border-r">
      <div className="flex items-center pt-3">
        <Logo />
        <h1 className="text-lg text-white">Music Instrument Learning</h1>
      </div>
      <div className="flex flex-col items-start w-full px-5 pt-5 gap-y-2">
        {chapters.map((chapter) => (
          <CourseSideBarLink key={chapter.id} label={chapter.title} link={`/courses/${chapter.courseId}/chapters/${chapter.id}`} locked={!chapter.isFree && !purchase} />
        ))}
      </div>
    </div>
  );
}
