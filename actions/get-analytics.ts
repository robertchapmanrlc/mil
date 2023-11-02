import { database } from "@/lib/database";
import { Course, Purchase } from "@prisma/client";

type CoursePurchase = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: CoursePurchase[]) => {
  const groupedCourses: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseName = purchase.course.name!;

    if (!groupedCourses[courseName]) {
      groupedCourses[courseName] = 0;
    }
    groupedCourses[courseName] += purchase.course.price!;
  });

  return groupedCourses;
};

export async function getAnalytics(userId: string) {
  try {
    const purchases = await database.purchase.findMany({
      where: {
        course: {
          userId
        }
      },
      include: {
        course: true
      }
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseName, total]) => ({
      name: courseName,
      total: total
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTCS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
