import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCourseForEditing } from "@/actions/get-courses";
import { getGenres } from "@/actions/get-categories";
import EditImageForm from "./components/edit-image-form";
import EditDescriptionForm from "./components/edit-description-form";
import EditGenreForm from "./components/edit-genre-form";
import EditNameForm from "./components/edit-name-form";
import EditPriceForm from "./components/edit-price-form";
import EditChaptersForm from "./components/edit-chapters-form";
import CourseActions from "./components/course-actions";
import Banner from "@/components/banner";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await getCourseForEditing(params.courseId);

  if (!course) {
    return redirect("/");
  }

  const genres = await getGenres();

  const requiredFields = [
    course.name,
    course.description,
    course.genre,
    course.imageUrl,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const canPublish = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course has not been published. Students won't be able to see them when browsing."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-xl sm:text-2xl font-medium">Course Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <CourseActions
                disabled={!canPublish}
                courseId={params.courseId}
                isPublished={course.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <EditNameForm course={course} />
            <EditDescriptionForm course={course} />
            <EditImageForm course={course} />
            <EditGenreForm
              course={course}
              genres={genres.map((genre) => ({
                label: genre.name,
                value: genre.id,
              }))}
            />
          </div>
          <div>
            <div>
              <EditChaptersForm course={course} />
            </div>
            <div>
              <EditPriceForm course={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
