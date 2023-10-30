"use client";

import { PlusCircle } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import Link from "next/link";

interface EditChaptersFormProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export default function EditChaptersForm({ course }: EditChaptersFormProps) {
  return (
    <div className="border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapters
        <Button variant="ghost">
          <Link href={`/teacher/courses/${course.id}/chapters/create`} className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Chapter
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {course.chapters.map((chapter) => (
          <div className="bg-neutral-200 p-2 rounded-md hover:bg-neutral-300">
            <Link href={`/teacher/courses/${course.id}/chapters/${chapter.id}`}>
              <p className="text-sm">{chapter.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
