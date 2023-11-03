import { Course, Genre } from "@prisma/client";
import CourseCard from "./course-card";

type CourseWithGenre = Course & {
  genre: Genre;
  chapters: { id: string }[];
};

interface CoursesListProps {
  items: CourseWithGenre[];
}

export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            genre={item.genre.name}
          />
        ))}
      </div>
    </div>
  );
}
