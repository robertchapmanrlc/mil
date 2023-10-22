import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }

    const values = await req.json();

    const updatedCourse = await database.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.log("[COURSE_ID]", error);
  }
}
