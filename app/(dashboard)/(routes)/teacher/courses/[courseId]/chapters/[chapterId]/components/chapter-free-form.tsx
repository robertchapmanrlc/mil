"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Chapter } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  editChapterAccessFormSchema,
  editChapterAccessFormSchemaType,
} from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterFreeProps {
  chapter: Chapter;
}

export default function ChapterFreeForm({ chapter }: ChapterFreeProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editChapterAccessFormSchemaType>({
    resolver: zodResolver(editChapterAccessFormSchema),
    defaultValues: {
      isFree: chapter.isFree
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: editChapterAccessFormSchemaType) => {
    try {
      await axios.patch(
        `/api/courses/${chapter.courseId}/chapters/${chapter.id}`,
        data
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Access
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm pt-2 cursor-pointer" onClick={toggleEdit}>
          {chapter.isFree ? (
            <>This chapter is free</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 space-y-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for
                      preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} variant='custom' type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
