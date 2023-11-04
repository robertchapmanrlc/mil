import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  id: string;
  name: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  genre: string;
  progress: number | null;
}

export default function CourseCard({
  id,
  name,
  imageUrl,
  chaptersLength,
  price,
  genre,
  progress
}: CourseCardProps) {

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt="Name" src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-green-600 transition line-clamp-2">
            {name}
          </div>
          <p className="text-xs text-muted-foreground">{genre}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-neutral-500">
              <BookOpen size={20} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== undefined ? (
            <div>
              <CourseProgress
                value={progress!}
                size='sm'
                variant={progress === 100 ? 'success' : 'default'}
              />
            </div>
          ) : (
            <>
              <p className="text-md md:text-sm font-medium text-neutral-700">
                {formatPrice(price)}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
