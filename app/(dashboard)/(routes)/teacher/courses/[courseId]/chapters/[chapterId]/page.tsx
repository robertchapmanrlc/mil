import { getCourseChapter } from "@/actions/get-chapters";
import { redirect } from "next/navigation";
import React from "react";
import ChapterDescriptionForm from "./components/chapter-description-form";
import ChapterNameForm from "./components/chapter-name-form";


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
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <ChapterNameForm chapter={chapter} />
          <ChapterDescriptionForm chapter={chapter} />
        </div>
      </div>
    </div>
  );
}
