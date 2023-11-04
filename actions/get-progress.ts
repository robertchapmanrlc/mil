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
