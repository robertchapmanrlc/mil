import { getCourse } from "@/actions/get-courses";
import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: { courseId: string } }) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await getCourse(userId, params.courseId);

  if (!course) {
    return redirect("/");
  }

  return (
    <div>
      <p>{params.courseId}</p>
      <p>{course.name}</p>
      <p>{course.description}</p>
    </div>
  );
}
