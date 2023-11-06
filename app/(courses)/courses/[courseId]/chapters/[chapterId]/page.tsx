import { getCourseChapter } from "@/actions/get-chapters";
import { getCourse } from "@/actions/get-courses";
import { getCoursePurchase } from "@/actions/get-purchases";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import EnrollButton from "./components/enroll-button";
import { cn } from "@/lib/utils";
import CompleteButton from "./components/complete-button";
import { getChapterProgress } from "@/actions/get-progress";

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

  const purchase = await getCoursePurchase(params.courseId, userId);

  const studentProgress = await getChapterProgress(params.chapterId, userId);

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-2 gap-y-2">
        <h1 className="text-2xl font-semibold">{chapter.title}</h1>
        {isLocked ? <EnrollButton price={course.price!} courseId={course.id} /> : <CompleteButton courseId={chapter.courseId} chapterId={chapter.id} isCompleted={!!studentProgress?.isCompleted} />}
      </div>
      <Separator />
      <div className={cn(
        isLocked && "blur-sm"
      )}>
        <p className="mt-2">{chapter.description}</p>
      </div>
    </div>
  );
}
