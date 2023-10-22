"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editCourseDescriptionFormSchema,
  editCourseDescriptionFormSchemaType,
} from "@/lib/types";
import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type EditCourseFormProps = {
  course: Course;
};

export default function EditCourseForm({ course }: EditCourseFormProps) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editCourseDescriptionFormSchemaType>({
    resolver: zodResolver(editCourseDescriptionFormSchema),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input
        {...register("description")}
        type="text"
        placeholder={
          !course?.description ? "No description" : course?.description
        }
      />
      {errors.description && <p>{errors.description.message}</p>}

      <button type="submit">Save</button>
    </form>
  );
}
