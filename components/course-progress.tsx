import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-green-900",
  success: "text-green-600",
};

const sizeByVariant = {
  default: "sm",
  sm: "text-xs",
};

export default function CourseProgress({ value, variant, size }: CourseProgressProps) {
  return (
    <div>
      <Progress
        value={value}
        className="h-2"
        variant={variant}
      />
      <p className={cn(
        "font-medium mt-2 text-green-500",
        colorByVariant[variant || "default"],
        sizeByVariant[size || 'default']
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}
