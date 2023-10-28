"use client";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { PlusCircle, ImageIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

type EditCourseFormProps = {
  course: Course;
};

export default function EditImageForm({ course }: EditCourseFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: { imageUrl: string }) => {
    try {
      await axios.patch(`/api/courses/${course.id}`, data);
      router.refresh();
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
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : !course.imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!course.imageUrl ? (
          <>
            <div className="flex items-center justify-center h-60 bg-neutral-300 rounded-md">
              <ImageIcon className="h-10 w-10 text-neutral-800" />
            </div>
          </>
        ) : (
          <>
            <div className="relative aspect-video mt-2">
              <Image
                alt="upload"
                fill
                className="object-cover rounded-md"
                src={course.imageUrl}
              />
            </div>
          </>
        ))}
      {isEditing && (
        <>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </>
      )}
    </div>
  );
}
