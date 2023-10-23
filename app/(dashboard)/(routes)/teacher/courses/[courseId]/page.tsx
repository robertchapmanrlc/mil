import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import EditCourseForm from "./components/edit-course-form";


export default async function CoursePage({
  params,
}: {
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
    <div>
      {params.courseId}
      <p>{course.name}</p>
      <EditCourseForm course={course}/>
    </div>
  );
}
