import { redirect } from "next/navigation";

import { getCourseChapter } from "@/actions/get-chapters";
import ChapterNameForm from "./components/chapter-name-form";
import ChapterDescriptionForm from "./components/chapter-description-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const chapter = await getCourseChapter(params.chapterId, params.courseId);

  if (!chapter) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <Link href={`/teacher/courses/${chapter.courseId}`} className="flex gap-2 mb-8">
        <ArrowLeft />
        Go back to course page
      </Link>
      <div className="flex flex-col">
        <ChapterNameForm chapter={chapter} />
        <ChapterDescriptionForm chapter={chapter} />
      </div>
    </div>
  );
}
