import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await database.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await database.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedChapter = await database.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const remainingChapters = await database.chapter.findMany({
      where: {
        courseId: params.courseId
      }
    });

    if (remainingChapters.length === 0) {
      const updatedCourse = await database.course.update({
        where: {
          id: params.courseId
        },
        data: {
          isPublished: false
        }
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("CHAPTER_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await database.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await database.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      }
    });

    if (!chapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const updatedChapter = await database.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(updatedChapter);

  } catch (error) {
    console.log("CHAPTER_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
