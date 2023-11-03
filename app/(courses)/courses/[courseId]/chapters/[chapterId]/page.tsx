import { getCourseChapter } from "@/actions/get-chapters";
import { getCourse } from "@/actions/get-courses";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CourseChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await getCourse(params.courseId);

  if (!course) {
    return redirect("/");
  }

  const chapter = await getCourseChapter(params.chapterId, params.courseId);

  if (!chapter) {
    return redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">{chapter.title}</h1>
      <Separator />
      <p className="mt-2">{chapter.description}</p>
    </div>
  );
}
