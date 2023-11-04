import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const studentProgress = await database.studentProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted
      }
    });

    return NextResponse.json(studentProgress);
    
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
