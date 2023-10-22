
"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type BuyButtonProps = {
  courseId: string;
};

export default function BuyButton({ courseId }: BuyButtonProps) {

  const router = useRouter();

  const onClick = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/checkout`);
      toast.success("Course purchased");
      router.refresh();
    } catch (error) {
      toast.error("Somethine went wrong");
    }
  };

  return <button onClick={onClick}>Buy</button>;
}
