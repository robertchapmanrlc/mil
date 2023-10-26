"use client";

import {
  createCourseChapterFormSchema,
  createCourseChapterFormSchemaType,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateChapterPage({ params }: { params: { courseId: string }}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createCourseChapterFormSchemaType>({
    resolver: zodResolver(createCourseChapterFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post(`/api/courses/${params.courseId}/chapters`, data);
      router.refresh();
      router.push(`/teacher/courses/${params.courseId}`);
      toast.success("Chapter Created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-y-2"
      >
        <label className="text-2xl">Chapter Name</label>
        <input
          {...register("title")}
          type="text"
          className="border w-60"
          placeholder="...learning dynamics"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <button
          disabled={isSubmitting}
          type="submit"
          className="disabled:opacity-40"
        >
          Add Chapter
        </button>
      </form>
    </div>
  );
}
