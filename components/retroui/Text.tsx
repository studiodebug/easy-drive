import React, { ElementType } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "font-head text-5xl md:text-6xl font-black leading-tight tracking-tight",
      h1: "font-head text-4xl md:text-5xl font-black leading-tight",
      h2: "font-head text-3xl md:text-4xl font-black leading-[1.1]",
      h3: "font-head text-2xl md:text-3xl font-bold leading-snug",
      h4: "font-head text-xl md:text-2xl font-bold leading-snug",
      h5: "font-head text-lg md:text-xl font-semibold leading-snug",
      h6: "font-head text-base md:text-lg font-semibold leading-snug",
      lead: "font-sans text-xl md:text-2xl font-medium leading-relaxed text-muted-foreground",
      bodyLg: "font-sans text-lg leading-relaxed",
      body: "font-sans text-base leading-relaxed",
      bodySm: "font-sans text-sm leading-relaxed",
      caption: "font-sans text-xs leading-tight text-muted-foreground",
      eyebrow:
        "font-head text-xs uppercase tracking-[0.18em] leading-[1.2] text-muted-foreground",
      label: "font-head text-sm font-semibold uppercase tracking-wide",
      mono: "font-mono text-sm leading-relaxed",
      button:
        "font-head text-sm md:text-base font-semibold uppercase tracking-wide",
      link: "font-sans text-base leading-relaxed underline-offset-4 decoration-[3px] decoration-primary hover:underline text-primary",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TextVariant = VariantProps<typeof textVariants>["variant"];
type TextAs = ElementType;

type TextProps<TAs extends TextAs = "p"> = {
  as?: TAs;
  variant?: TextVariant;
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<
    TAs extends keyof React.JSX.IntrinsicElements ? TAs : "div"
  >,
  "as" | "className" | "variant"
>;

const defaultVariantByAs: Partial<Record<string, TextVariant>> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  a: "link",
  p: "body",
  span: "body",
  li: "body",
  label: "label",
};

const defaultAsByVariant: Partial<
  Record<NonNullable<TextVariant>, ElementType>
> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  bodyLg: "p",
  body: "p",
  bodySm: "p",
  caption: "p",
  eyebrow: "p",
  label: "label",
  mono: "p",
  button: "span",
  link: "a",
};

export const Text = <TAs extends TextAs = "p">(props: TextProps<TAs>) => {
  const { className, as, variant, ...otherProps } = props;
  const resolvedVariant = variant ?? defaultVariantByAs[String(as)] ?? "body";
  const resolvedAs: ElementType =
    (as as ElementType) ?? defaultAsByVariant[resolvedVariant] ?? "p";
  const Tag: ElementType = resolvedAs;

  return (
    <Tag
      className={cn(textVariants({ variant: resolvedVariant }), className)}
      {...otherProps}
    />
  );
};
