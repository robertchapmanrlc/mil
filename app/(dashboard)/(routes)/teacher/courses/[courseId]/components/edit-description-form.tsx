"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  editCourseDescriptionFormSchema,
  editCourseDescriptionFormSchemaType,
} from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

type EditDescriptionFormProps = {
  course: Course;
};

export default function EditDescriptionForm({
  course,
}: EditDescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editCourseDescriptionFormSchemaType>({
    resolver: zodResolver(editCourseDescriptionFormSchema),
    defaultValues: {
      description: course.description || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: editCourseDescriptionFormSchemaType) => {
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
      {!isEditing && <p className="text-sm pt-2">{course.description}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. Learn how to play the piano"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="custom" disabled={isSubmitting || !isValid}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
