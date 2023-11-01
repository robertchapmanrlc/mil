import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Banner from "@/components/banner";
import ChapterActions from "./components/chapter-actions";
import ChapterNameForm from "./components/chapter-name-form";
import ChapterDescriptionForm from "./components/chapter-description-form";
import { getCourseChapter } from "@/actions/get-chapters";
import ChapterFreeForm from "./components/chapter-free-form";

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const chapter = await getCourseChapter(params.chapterId, params.courseId);

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const canPublish = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. Students won't be able to see it in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transiton mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course page
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!canPublish}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <ChapterNameForm chapter={chapter} />
            <ChapterDescriptionForm chapter={chapter} />
          </div>
          <div>
            <ChapterFreeForm chapter={chapter}/>
          </div>
        </div>
      </div>
    </>
  );
}
