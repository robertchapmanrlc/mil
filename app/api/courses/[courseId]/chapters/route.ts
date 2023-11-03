import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params } : { params: { courseId : string} }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();

    const course = await database.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await database.chapter.findFirst({
      where: {
        courseId: params.courseId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await database.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition
      }
    });

    return NextResponse.json(chapter);

  } catch (error) {
    console.log("[COURSES_CHAPTERS_POST]", error);
    return new NextResponse("Internal error", {status: 500});
  }
}
