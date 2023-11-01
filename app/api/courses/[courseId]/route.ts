import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await database.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedCourse = await database.course.delete({
      where: {
        id: params.courseId,
        userId
      }
    });

    return NextResponse.json(deletedCourse);

  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    console.log("[COURSE_ID_PATCH]", error);
  }
}
