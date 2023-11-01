import { redirect } from "next/navigation";

import { getCourseChapter } from "@/actions/get-chapters";
import ChapterNameForm from "./components/chapter-name-form";
import ChapterDescriptionForm from "./components/chapter-description-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ChapterActions from "./components/chapter-actions";

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
      <div className="flex flex-row justify-between">
        <Link href={`/teacher/courses/${chapter.courseId}`} className="flex gap-2 mb-8">
          <ArrowLeft />
          Go back to course page
        </Link>
        <ChapterActions courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished} />
      </div>
      <div className="flex flex-col">
        <ChapterNameForm chapter={chapter} />
        <ChapterDescriptionForm chapter={chapter} />
      </div>
    </div>
  );
}
