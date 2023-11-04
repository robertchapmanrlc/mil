import { database } from "@/lib/database";

export async function getChapterProgress(chapterId: string, userId: string) {
  try {
    const progress = await database.studentProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      }
    });

    return progress;
  } catch (error) {
    console.log("[GET_CHAPTER_PROGRESS]", error);
    return null;
  }
}

export async function getCourseProgress(courseId:string, userId: string) {
  try {
    const publishedChapters = await database.chapter.findMany({
      where: {
        courseId,
        isPublished: true
      },
      select: {
        id: true,
      }
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validateCompletedChapters = await database.studentProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds
        },
        isCompleted: true
      }
    });

    const progressPercentage = (validateCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_CHAPTER_PROGRESS]", error);
    return null;
  }
}
