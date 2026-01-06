import React, { ElementType } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("font-head", {
  variants: {
    as: {
      p: "font-sans text-base",
      li: "font-sans text-base",
      a: "font-sans text-base hover:underline underline-offset-2 decoration-primary",
      h1: "text-4xl lg:text-5xl font-bold",
      h2: "text-3xl lg:text-4xl font-semibold",
      h3: "text-2xl font-medium",
      h4: "text-xl font-normal",
      h5: "text-lg font-normal",
      h6: "text-base font-normal",
    },
  },
  defaultVariants: {
    as: "p",
  },
});

type TextAs = NonNullable<VariantProps<typeof textVariants>["as"]>;

type TextProps<TAs extends TextAs = "p"> = {
  as?: TAs;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "className">;

export const Text = <TAs extends TextAs = "p">(props: TextProps<TAs>) => {
  const { className, as, ...otherProps } = props;
  const Tag: ElementType = (as || "p") as ElementType;

  return (
    <Tag className={cn(textVariants({ as }), className)} {...otherProps} />
  );
};
