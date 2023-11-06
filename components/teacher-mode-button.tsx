"use client";

import { usePathname, useRouter } from "next/navigation";

export default function TeacherModeButton() {
  const pathname = usePathname();
  const router = useRouter();

  const inTeacherMode = pathname?.includes("teacher");

  const onClick = () => {
    if (!inTeacherMode) {
      router.push("/teacher/courses");
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={onClick}>
      <p className="text-sm sm:text-base">{!inTeacherMode ? "Teacher mode" : "Student Mode"}</p>
    </button>
  );
}
