import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all duration-200 ease-smooth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-[0_4px_12px_rgba(236,72,153,0.30)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.40)] hover:-translate-y-px active:translate-y-0 active:shadow-sm",
        secondary:
          "bg-white text-pink-600 border-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400 hover:-translate-y-px active:translate-y-0",
        ghost:
          "text-pink-600 hover:bg-pink-50 hover:text-pink-700 active:bg-pink-100",
        outline:
          "border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:-translate-y-px active:translate-y-0",
        lavender:
          "bg-gradient-to-br from-lavender-500 to-lavender-600 text-white shadow-[0_4px_12px_rgba(139,92,246,0.30)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.40)] hover:-translate-y-px active:translate-y-0",
        coral:
          "bg-gradient-to-br from-coral-500 to-coral-600 text-white shadow-[0_4px_12px_rgba(255,107,107,0.30)] hover:shadow-[0_6px_20px_rgba(255,107,107,0.40)] hover:-translate-y-px active:translate-y-0",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 hover:-translate-y-px active:translate-y-0",
        link:
          "text-pink-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
