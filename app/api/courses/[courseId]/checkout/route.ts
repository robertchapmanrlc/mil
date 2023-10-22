import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const purchase = await database.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Course already purchased", { status: 401 });
    }

    const course = await database.course.findUnique({
      where: {
        id: params.courseId
      }
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const new_purchase = await database.purchase.create({
      data: {
        userId,
        courseId: params.courseId
      }
    });

    return NextResponse.json(new_purchase);
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
