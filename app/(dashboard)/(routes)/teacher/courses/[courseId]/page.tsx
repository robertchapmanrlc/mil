import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCourse } from "@/actions/get-courses";
import { getGenres } from "@/actions/get-categories";
import { getCourseChapters } from "@/actions/get-chapters";
import EditImageForm from "./components/edit-image-form";
import EditDescriptionForm from "./components/edit-description-form";
import EditGenreForm from "./components/edit-genre-form";
import EditNameForm from "./components/edit-name-form";
import EditPriceForm from "./components/edit-price-form";
import EditChaptersForm from "./components/edit-chapters-form";

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

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}
