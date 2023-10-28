"use client"

import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
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
        Course Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Edit Description
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
