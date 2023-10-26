"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editChapterDescriptionFormSchema,
  editChapterDescriptionFormSchemaType,
} from "@/lib/types";
import { Chapter } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type ChapterDescriptionFormProps = {
  chapter: Chapter;
};

export default function ChapterDescriptionForm(
  { chapter }: ChapterDescriptionFormProps,
) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editChapterDescriptionFormSchemaType>({
    resolver: zodResolver(editChapterDescriptionFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.patch(
        `/api/courses/${chapter.courseId}/chapters/${chapter.id}`,
        data
      );
      router.refresh();
      toast.success("Chapter Updated");
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
          !chapter?.description ? "No description" : chapter?.description
        }
      />
      {errors.description && <p>{errors.description.message}</p>}

      <button type="submit">Save</button>
    </form>
  );
}
