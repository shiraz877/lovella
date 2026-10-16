import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-semibold tracking-wide whitespace-nowrap",
  {
    variants: {
      variant: {
        pink: "bg-pink-100 text-pink-700",
        lavender: "bg-lavender-100 text-lavender-600",
        coral: "bg-coral-100 text-coral-600",
        green: "bg-green-100 text-green-700",
        cream: "bg-cream text-pink-700 border border-pink-200",
        outline: "border-2 border-pink-200 text-pink-600",
        dark: "bg-pink-900 text-pink-100",
      },
      size: {
        sm: "text-[0.7rem] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
