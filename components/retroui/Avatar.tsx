/**
 * Avatar Component - Retro-styled avatar with size variants
 *
 * Simple Usage (recommended):
 * <Avatar
 *   name="John Doe"
 *   src="/avatar.jpg"
 *   alt="John Doe"
 *   size="md"
 *   showOnlineIndicator
 * />
 *
 * Advanced Usage (compound pattern):
 * <Avatar size="sm">
 *   <Avatar.Image src="..." alt="..." />
 *   <Avatar.Fallback>AB</Avatar.Fallback>
 * </Avatar>
 *
 * Sizes:
 * - sm: 40x40px (border-2)
 * - md: 56x56px (border-3) - default
 * - lg: 96x96px (border-4)
 */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex border-black rounded-none overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  {
    variants: {
      size: {
        sm: "h-10 w-10 border-2",
        md: "h-14 w-14 border-3",
        lg: "h-24 w-24 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const onlineIndicatorVariants = cva(
  "absolute top-0 right-0 bg-green-500 border-black translate-x-1/2 -translate-y-1/2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  {
    variants: {
      size: {
        sm: "w-3 h-3 border",
        md: "w-4 h-4 border-2",
        lg: "w-5 h-5 border-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Gera as iniciais a partir do nome completo
 */
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export interface AvatarProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
      "children"
    >,
    VariantProps<typeof avatarVariants> {
  /** Nome completo para gerar fallback automaticamente */
  name?: string;
  /** URL da imagem do avatar */
  src?: string;
  /** Texto alternativo da imagem */
  alt?: string;
  /** Exibir indicador de status online */
  showOnlineIndicator?: boolean;
  /** Permite uso do compound pattern (Avatar.Image, Avatar.Fallback) */
  children?: React.ReactNode;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size,
      name,
      src,
      alt,
      showOnlineIndicator = false,
      children,
      ...props
    },
    ref
  ) => {
    // Se children é fornecido, usa o compound pattern (modo avançado)
    if (children) {
      return (
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {children}
          {showOnlineIndicator && (
            <div className={cn(onlineIndicatorVariants({ size }))} />
          )}
        </AvatarPrimitive.Root>
      );
    }

    // Modo simples: gera automaticamente Image e Fallback
    const fallbackText = name ? getInitials(name) : "??";
    const altText = alt || name || "Avatar";

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={altText}
            className="aspect-square h-full w-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-white font-semibold text-black">
          {fallbackText}
        </AvatarPrimitive.Fallback>
        {showOnlineIndicator && (
          <div className={cn(onlineIndicatorVariants({ size }))} />
        )}
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "Avatar.Image";

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-white font-semibold text-black",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "Avatar.Fallback";

const AvatarComponent = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { AvatarComponent as Avatar };
