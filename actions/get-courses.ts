import { database } from "@/lib/database";

export async function getCourse(userId: string, courseId: string) {
  try {
    const course = await database.course.findUnique({
      where: {
        id: courseId,
        userId: userId
      }
    });
    return course;
  } catch (error) {
    console.log("[GET_COURSE]", error);
    return null;
  }
}

export async function getAllCourses() {
  try {
    const courses = await database.course.findMany();
    return courses;
  } catch (error) {
    console.log("[GET_ALL_COURSES]", error);
    return [];
  }
}

export async function getTeacherCourses(userId: string) {
  try {
    const teacherId = userId;
    const teacherCourses = await database.course.findMany({
      where: {
        userId: teacherId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return teacherCourses;
  } catch (error) {
    console.log("[GET_TEACHER_COURSES]", error);
    return [];
  }
}
