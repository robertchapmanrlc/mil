import { getCourseChapter } from "@/actions/get-chapters";
import { redirect } from "next/navigation";
import React from "react";

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
    <div>
      <h1>{chapter.title}</h1>
      <p>{chapter?.description}</p>
    </div>
  );
}
