
import { UserButton } from "@clerk/nextjs";
import TeacherModeButton from "@/components/teacher-mode-button";
import MobileCourseSidebar from "./mobile-course-side-bar";
import { Chapter } from "@prisma/client";

interface CourseNavbarProps {
  chapters: Chapter[];
}

export default function CourseNavbar({ chapters } : CourseNavbarProps) {
  return (
    <div className="h-full flex items-center bg-white border-b shadow-sm p-4">
      <MobileCourseSidebar chapters={chapters} />
      <div className="flex items-center gap-x-5 ml-auto">
        <TeacherModeButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
