"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CompleteButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
}

export default function CompleteButton({
  chapterId,
  courseId,
  isCompleted,
}: CompleteButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted }
      );

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={isCompleted ? "custom" : "outline"}
      type="button"
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as completed"}
      <Icon className="w-4 h-4 ml-2" />
    </Button>
  );
}
