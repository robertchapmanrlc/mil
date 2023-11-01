import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-300 text-primary",
        success: "bg-green-700 border-green-700 text-secondary"
      },
    },
    defaultVariants: {
      variant: 'warning'
    }
  }
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
}

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

export default function Banner({ label, variant }: BannerProps) {
  const Icon = iconMap[variant || 'warning'];

  return (
    <div className={cn(bannerVariants({variant}))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
}
