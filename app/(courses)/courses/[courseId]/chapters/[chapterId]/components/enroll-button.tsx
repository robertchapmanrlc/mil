
"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type EnrollButtonProps = {
  price: number;
  courseId: string;
};

export default function EnrollButton({ price, courseId }: EnrollButtonProps) {

  const router = useRouter();

  const onClick = async () => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      toast.success("Course purchased");
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Somethine went wrong");
    }
  };

  return <Button variant='custom' onClick={onClick}>Enroll for {formatPrice(price)}</Button>;
}
