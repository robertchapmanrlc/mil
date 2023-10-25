"use client"

import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

type EditCourseFormProps = {
  course: Course;
};

export default function EditImageForm({ course }: EditCourseFormProps) {
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

  return (
    <div>
      {course?.imageUrl && <Image src={course.imageUrl} alt="Course image" width={200} height={300} />}
      <FileUpload endpoint='courseImage' onChange={(url) => {
        if (url) {
          onSubmit({ imageUrl: url})
        }
      }}/>
    </div>
  );
}
