import { database } from "@/lib/database";

export async function getCourseChapters(courseId: string) {
  try {
    const courses = await database.chapter.findMany({
      where: {
        courseId: courseId
      }
    });
    return courses;
  } catch (error) {
    console.log("GET_COURSE_CHAPTERS", error);
    return [];
  }
}
