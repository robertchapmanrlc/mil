"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ChapterActionsProps {
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  disabled: boolean;
}

export default function ChapterActions({
  courseId,
  chapterId,
  isPublished,
  disabled
}: ChapterActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);

    try {
      if (!isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter Published");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter Unpublished");
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
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-x-4">
      <Button variant="custom" onClick={onClick} disabled={disabled || isLoading}>
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
