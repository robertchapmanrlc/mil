import { getPurchasedCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs"
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
        <h1 key={course.id}>{course.name}</h1>
      ))}
    </div>
  )
}
