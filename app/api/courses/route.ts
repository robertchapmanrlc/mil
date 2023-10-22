import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401});
    }

    const { name } = await req.json();

    const course = await database.course.create({
      data: {
        name: name,
        userId: userId
      }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES_POST]", error);
    return new NextResponse("Internal error", {status: 500});
  }
}
