"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface CourseActionsProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

export default function CourseActions({
  courseId,
  isPublished,
  disabled,
}: CourseActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);

    try {
      if (!isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/publish`
        );
        toast.success("Course Published");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/unpublish`
        );
        toast.success("Course Unpublished");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-x-4">
      <Button
        variant="custom"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {!isPublished ? "Publish" : "Unpublish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button>
          <Trash className="w-5 h-5" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
