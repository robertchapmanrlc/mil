
import Logo from "@/components/logo";
import { Chapter, Course } from "@prisma/client";
import CourseSideBarLink from "./course-side-bar-item";

type CourseSideBarProps = {
  chapters: Chapter[];
}

export default function CourseSideBar({ chapters } : CourseSideBarProps) {

  return (
    <div className="h-full flex flex-col items-center bg-green-600 overflow-y-auto shadow-sm border-r">
      <div className="flex items-center pt-3">
        <Logo />
        <h1 className="text-lg text-white">Music Instrument Learning</h1>
      </div>
      <div className="flex flex-col items-start w-full px-5 pt-5 gap-y-2">
        {chapters.map((chapter) => (
          <CourseSideBarLink key={chapter.id} label={chapter.title} link={`/courses/${chapter.courseId}/chapters/${chapter.id}`} />
        ))}
      </div>
    </div>
  );
}
