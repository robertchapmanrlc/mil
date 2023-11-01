"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface ChapterActionsProps {
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export default function ChapterActions({
  courseId,
  chapterId,
  isPublished,
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

  return (
    <Button variant="custom" onClick={onClick}>
      {!isPublished ? "Publish" : "Unpublish"}
    </Button>
  );
}
