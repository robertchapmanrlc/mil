import { getAllCourses } from "@/actions/get-courses";
import Link from "next/link";

export default async function SearchPage() {

  const courses = await getAllCourses();

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Link href={`/courses/${course.id}`}>
            {course.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
