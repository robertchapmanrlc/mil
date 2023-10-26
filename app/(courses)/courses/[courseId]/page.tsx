
import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BuyButton from "./components/buy-button";
import { getCoursePurchase } from "@/actions/get-purchases";

export default async function ({ params }: { params: { courseId: string } }) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await getCourse(params.courseId);

  if (!course) {
    return redirect("/");
  }

  const purchase = await getCoursePurchase(params.courseId, userId);

  if (purchase) {
    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  }

  return (
    <div>
      <p>{params.courseId}</p>
      <p>{course.name}</p>
      <p>{course.description}</p>
      <p>${course.price}</p>
      <BuyButton courseId={params.courseId} />
    </div>
  );
}
