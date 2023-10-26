import { database } from "@/lib/database";

export async function getCoursePurchase(courseId: string, userId: string) {
  try {
    const purchase = await database.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      }
    });

    return purchase;

  } catch (error) {
    console.log("GET_COURSE_PURCHASE", error);
    return null;
  }
}
