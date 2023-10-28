"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course, Genre } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  editCourseGenreFormSchema,
  editCourseGenreFormSchemaType,
} from "@/lib/types";
import { Combobox } from "@/components/ui/combo-box";

type EditCourseFormProps = {
  course: Course & { genre: Genre | null };
  genres: {
    label: string;
    value: string;
  }[];
};

export default function EditGenreForm({ course, genres }: EditCourseFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editCourseGenreFormSchemaType>({
    resolver: zodResolver(editCourseGenreFormSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: editCourseGenreFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${course.id}`, data);
      router.refresh();
      toggleEdit();
      toast.success("Course Updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const selectedGenre = genres.find((genre) => genre.value === course.genre?.id);

  return (
    <div className="mt-5 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">{selectedGenre?.label || "No genre"}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 space-y-4">
            <FormField
              control={form.control}
              name='genreId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={genres}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant='custom' disabled={isSubmitting || !isValid}>Save</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
