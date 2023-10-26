import { database } from "@/lib/database";

export async function getCourseChapters(courseId: string) {
  try {
    const chapters = await database.chapter.findMany({
      where: {
        courseId: courseId
      }
    });
    return chapters;
  } catch (error) {
    console.log("GET_COURSE_CHAPTERS", error);
    return [];
  }
}

export async function getCourseChapter(chapterId:string, courseId: string) {
  try {
    const chapter = await database.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId
      }
    });
    return chapter;
  } catch (error) {
    console.log("GET_COURSE_CHAPTER", error);
    return null;
  }
}
