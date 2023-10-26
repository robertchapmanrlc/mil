import Navbar from "@/components/navbar";
import CourseSideBar from "./components/course-side-bar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourse } from "@/actions/get-courses";

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

  return (
    <div className="h-full">
      <div className="hidden md:flex w-80 h-full flex-col fixed inset-y-0 z-50">
        <CourseSideBar course={course} />
      </div>
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="h-full md:pl-80 pt-20">{children}</main>
    </div>
  );
}
