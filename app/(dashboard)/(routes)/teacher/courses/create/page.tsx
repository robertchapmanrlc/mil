"use client";

import { formSchema, formSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateCoursePage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/courses", data);
      router.refresh();
      router.push('/');
      toast.success("Course Created");
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
        <label className="text-2xl">Course Name</label>
        <input
          {...register("name")}
          type="text"
          className="border w-60"
          placeholder="...beginner piano"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <button
          disabled={isSubmitting}
          type="submit"
          className="disabled:opacity-40"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
