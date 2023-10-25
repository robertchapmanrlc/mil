"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editCourseGenreFormSchema,
  editCourseGenreFormSchemaType,
} from "@/lib/types";
import { Course, Genre } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type EditCourseFormProps = {
  course: Course & { genre: Genre | null };
  genres: Genre[];
};

export default function EditGenreForm({ course, genres }: EditCourseFormProps) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<editCourseGenreFormSchemaType>({
    resolver: zodResolver(editCourseGenreFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.patch(`/api/courses/${course.id}`, data);
      router.refresh();
      toast.success("Course Updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const genre = course.genre;

  return (
    <>
      {genre ? <p>Genre: {course?.genre?.name}</p> : "No category"}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <select {...register("genreId")}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
