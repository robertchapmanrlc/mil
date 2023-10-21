import Link from "next/link";

export default function TeacherDashboard() {
  return (
    <div className="w-full">
      <Link href="/teacher/courses/create">
        <button>Add a course</button>
      </Link>
    </div>
  );
}
