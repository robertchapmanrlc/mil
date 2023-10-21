import { getAllCourses } from "@/actions/get-courses"

export default async function Dashboard() {

  const courses = await getAllCourses();

  return (
    <h1 className="w-full">
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
        </div>
      ))}
    </h1>
  )
}
