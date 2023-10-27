"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  createCourseFormSchema,
  createCourseFormSchemaType,
} from "@/lib/types";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();

  const form = useForm<createCourseFormSchemaType>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/courses", data);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course Created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl h-full flex flex-col md:justify-center md:items-center mx-auto p-6">
      <div>
        <h1 className="text-2xl">Add Course Name</h1>
        <p className="text-sm text-neutral-500">
          What will you name your course?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-8 space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Beginner Piano Lessons"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What instrument will your course focus on?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={`/teacher/courses`}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="custom"
                disabled={isSubmitting || !isValid}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
