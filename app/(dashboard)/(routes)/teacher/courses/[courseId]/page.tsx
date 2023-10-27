import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCourse } from "@/actions/get-courses";
import { getGenres } from "@/actions/get-categories";
import { getCourseChapters } from "@/actions/get-chapters";
import EditImageForm from "./components/edit-image-form";
import EditCourseForm from "./components/edit-course-form";
import EditGenreForm from "./components/edit-course-genre";
import EditNameForm from "./components/edit-name-form";

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
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <EditNameForm course={course} />
          <EditCourseForm course={course} />
          <EditImageForm course={course} />
          <EditGenreForm course={course} genres={genres} />
        </div>
        <div className="flex flex-col">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/teacher/courses/${params.courseId}/chapters/${chapter.id}`}
            >
              {chapter.title}
            </Link>
          ))}
          <Link href={`/teacher/courses/${params.courseId}/chapters/create`}>
            Add Chapter
          </Link>
        </div>
      </div>
    </div>
  );
}
