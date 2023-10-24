import { getPurchasedCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs"
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Dashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const courses = await getPurchasedCourses(userId);

  return (
    <div className="w-full">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.id}`}>
          <h1>{course.name}</h1>
        </Link>
      ))}
    </div>
  );
}
