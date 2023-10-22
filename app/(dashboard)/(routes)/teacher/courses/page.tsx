import Link from "next/link";

import { getTeacherCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function TeacherDashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }
  
  const courses = await getTeacherCourses(userId);

  return (
    <div className="w-full flex flex-col items-start">
      <Link href="/teacher/courses/create">
        <button>Add a course</button>
      </Link>
      {courses.map((course) => (
        <Link key={course.id} href={`/teacher/courses/${course.id}`}>
          {course.name}
        </Link>
      ))}
    </div>
  );
}
