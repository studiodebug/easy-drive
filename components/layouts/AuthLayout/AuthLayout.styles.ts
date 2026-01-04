import { tv } from "tailwind-variants";

export const styles = tv({
  slots: {
    container: "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
    inner: "w-full max-w-sm",
    content: "",
  },
  variants: {
    isSpaced: {
      true: {
        content: "flex flex-col gap-6",
      },
      false: {
        content: "",
      },
    },
  },
  defaultVariants: {
    isSpaced: false,
  },
});
