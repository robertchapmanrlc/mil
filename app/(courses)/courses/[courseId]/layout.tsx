import Navbar from "@/components/navbar";
import CourseSideBar from "./components/course-side-bar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourse } from "@/actions/get-courses";
import { getCourseChapters } from "@/actions/get-chapters";

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

  if (!course) {
    return redirect("/");
  }

  const chapters = await getCourseChapters(course.id);

  console.log(chapters.length);

  if (chapters.length === 0) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex w-80 h-full flex-col fixed inset-y-0 z-50">
        <CourseSideBar chapters={chapters} />
      </div>
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="h-full md:pl-80 pt-20">{children}</main>
    </div>
  );
}
