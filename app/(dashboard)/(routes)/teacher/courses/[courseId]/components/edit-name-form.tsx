"use client";

import { Button } from "@/components/ui/button";
import {
  editCourseNameFormSchema,
  editCourseNameFormSchemaType,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditNameFormProps {
  course: Course;
}

export default function EditNameForm({ course }: EditNameFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editCourseNameFormSchemaType>({
    resolver: zodResolver(editCourseNameFormSchema),
    defaultValues: {
      name: course.name || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: editCourseNameFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${course.id}`, data);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div className="border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Name
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Name
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm pt-2 cursor-pointer" onClick={toggleEdit}>{course.name}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Beginner Piano Lessons"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
