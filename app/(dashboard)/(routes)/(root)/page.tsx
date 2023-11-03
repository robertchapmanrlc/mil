import { getPurchasedCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const courses = await getPurchasedCourses(userId);

  return (
    <div className="p-6">
      <CoursesList items={courses} />
    </div>
  );
}
