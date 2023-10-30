"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createCourseChapterFormSchema,
  createCourseChapterFormSchemaType,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { count } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateChapterPage({ params }: { params: { courseId: string }}) {
  const router = useRouter();

  const form = useForm<createCourseChapterFormSchemaType>({
    resolver: zodResolver(createCourseChapterFormSchema),
  });

  const { isSubmitting, isValid } = form.formState;

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
    <div className="max-w-5xl h-full flex flex-col md:justify-center md:items-center mx-auto p-6">
      <div>
        <h1 className="text-2xl">Add Chapter Name</h1>
        <p className="text-sm text-neutral-500">
          What will you name the chapter?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-8 space-y-5"
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Playing Scales"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will this chapter cover?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={`/teacher/courses/${params.courseId}`}>
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
