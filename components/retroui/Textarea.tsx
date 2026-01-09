import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { TextareaHTMLAttributes } from "react";

export const textareaVariants = cva(
  "font-sans w-full rounded border-2 border-black bg-background px-3 py-2 text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        outline: "shadow-none",
      },
      size: {
        sm: "text-sm min-h-[80px]",
        md: "text-base min-h-[120px]",
        lg: "text-lg min-h-[160px]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      size = "md",
      className = "",
      variant = "default",
      ...props
    }: ITextareaProps,
    forwardedRef
  ) => {
    return (
      <textarea
        ref={forwardedRef}
        className={cn(textareaVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
