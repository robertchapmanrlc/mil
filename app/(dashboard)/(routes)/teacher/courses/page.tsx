import Link from "next/link";

import { getTeacherCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function TeacherDashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }
  
  const courses = await getTeacherCourses(userId);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
