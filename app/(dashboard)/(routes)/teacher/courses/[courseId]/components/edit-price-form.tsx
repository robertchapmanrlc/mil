"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Course } from "@prisma/client";
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
  editCoursePriceFormSchema,
  editCoursePriceFormSchemaType,
} from "@/lib/types";

interface EditPriceFormProps {
  course: Course;
}

export default function EditPriceForm({ course }: EditPriceFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<editCoursePriceFormSchemaType>({
    resolver: zodResolver(editCoursePriceFormSchema),
    defaultValues: {
      price: course.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: editCoursePriceFormSchemaType) => {
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
  };

  return (
    <div className="border bg-neutral-100 rounded-md p-4 mt-5">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm pt-2 cursor-pointer">
          ${course.price}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 space-y-4">
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.01'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' variant='custom' disabled={isSubmitting || !isValid}>Save</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
