import { getAllCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";

export default async function SearchPage() {

  const courses = await getAllCourses();

  return (
    <div className="p-6">
      <CoursesList items={courses} />
    </div>
  );
}
