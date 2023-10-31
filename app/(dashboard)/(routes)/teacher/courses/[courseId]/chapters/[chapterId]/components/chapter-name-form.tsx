"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  editChapterNameFormSchema,
  editChapterNameFormSchemaType,
} from "@/lib/types";

interface ChapterNameProps {
  chapter: Chapter;
}

export default function ChapterNameForm({ chapter }: ChapterNameProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editChapterNameFormSchemaType>({
    resolver: zodResolver(editChapterNameFormSchema),
    defaultValues: {
      title: chapter.title || undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: editChapterNameFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}`, data);
      toast.success("Chapter updated");
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
        Chapter Name
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
      {!isEditing && <p className="text-sm pt-2 cursor-pointer" onClick={toggleEdit}>{chapter.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-2"
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Scale Fundamentals"
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
