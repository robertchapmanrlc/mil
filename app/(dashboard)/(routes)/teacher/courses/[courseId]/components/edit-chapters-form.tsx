"use client";

import { PlusCircle } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
          <Link
            href={`/teacher/courses/${course.id}/chapters/create`}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Chapter
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {course.chapters.map((chapter) => (
          <div className="bg-neutral-200 p-2 rounded-md hover:bg-neutral-300">
            <Link
              className="flex justify-between"
              href={`/teacher/courses/${course.id}/chapters/${chapter.id}`}
            >
              <p className="text-sm">{chapter.title}</p>
              <div className="flex gap-x-2">
                {chapter.isFree && <Badge variant='secondary'>Free</Badge>}
                <Badge
                  className={cn(
                    "bg-neutral-500",
                    chapter.isPublished && "bg-green-700"
                  )}
                >
                  {chapter.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
