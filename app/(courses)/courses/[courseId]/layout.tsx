import CourseSideBar from "./components/course-side-bar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourse } from "@/actions/get-courses";
import CourseNavbar from "./components/course-navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await getCourse(params.courseId);

  if (!course || course.chapters.length === 0) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden lg:flex w-80 h-full flex-col fixed inset-y-0 z-50">
        <CourseSideBar chapters={course.chapters} />
      </div>
      <div className="h-[80px] lg:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar chapters={course.chapters}/>
      </div>
      <main className="h-full lg:pl-80 pt-20">{children}</main>
    </div>
  );
}
