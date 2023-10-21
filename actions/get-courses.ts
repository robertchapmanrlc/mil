import { Course } from "@prisma/client";
import { database } from "@/lib/database";

export async function getAllCourses() {
  try {
    const courses = await database.course.findMany();
    return courses;
  } catch (error) {
    console.log("[GET_ALL_COURSES]", error);
    return [];
  }
}
