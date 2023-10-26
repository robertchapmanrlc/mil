import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import EditCourseForm from "./components/edit-course-form";
import EditImageForm from "./components/edit-image-form";
import { getGenres } from "@/actions/get-categories";
import EditGenreForm from "./components/edit-course-genre";
import { getCourseChapters } from "@/actions/get-chapters";
import Link from "next/link";


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

  const genres = await getGenres();
  const chapters = await getCourseChapters(course.id);

  return (
    <div>
      {params.courseId}
      <p>{course.name}</p>
      <EditCourseForm course={course} />
      <EditImageForm course={course} />
      <EditGenreForm course={course} genres={genres} />
      {chapters.map((chapter) => (
        <Link href={`/teacher/courses/${params.courseId}/chapters/${chapter.id}`}>
          {chapter.title}
        </Link>
      ))}
    </div>
  );
}
