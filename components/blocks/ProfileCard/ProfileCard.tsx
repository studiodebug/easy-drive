"use client";

import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Card } from "@/components/retroui/Card";
import React from "react";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/StarRating";
import { MapPin } from "lucide-react";
import { getAvailabilityBadge } from "@/lib/badge-utils";

// ============================================================================
// Types
// ============================================================================

interface ProfileCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface ProfileCardCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface ProfileCardAvatarProps {
  src?: string;
  alt: string;
  name?: string;
  fallback: string;
  showOnlineIndicator?: boolean;
}

interface ProfileCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ProfileCardHeaderProps {
  name: string;
  city?: string;
  state?: string;
  availability?: "disponivel" | "ocupado" | "indisponivel";
}

interface ProfileCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface ProfileCardSkillsProps {
  skills: string[];
  title?: string;
}

interface ProfileRatingProps {
  rating: number;
  showText?: boolean;
  totalClasses?: number;
}

// ============================================================================
// Compound Components
// ============================================================================

const ProfileCardRoot = ({
  children,
  className = "",
  fullWidth,
  ...props
}: ProfileCardRootProps) => {
  return (
    <Card
      className={`flex flex-col ${
        fullWidth ? "w-full" : "max-w-md"
      } w-full mx-auto border-4 border-black p-0 overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${className}`}
      {...props}
    >
      <ProfileCardCover />
      {children}
    </Card>
  );
};

const ProfileCardCover = ({
  children,
  className = "",
  ...props
}: ProfileCardCoverProps) => {
  return (
    <div
      className={`h-[72px] bg-accent border-b-4 border-black relative pattern-dots pattern-black pattern-bg-white pattern-size-4 pattern-opacity-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const ProfileCardContent = ({
  children,
  className = "",
  ...props
}: ProfileCardContentProps) => {
  return (
    <div
      className={`flex flex-col gap-3 px-6 pb-6 relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const ProfileCardAvatar = ({
  src,
  alt,
  fallback,
  showOnlineIndicator = false,
}: ProfileCardAvatarProps) => {
  return (
    <div className="absolute -top-12 left-6">
      <Avatar className="h-24 w-24 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        {src && <Avatar.Image src={src} alt={alt} />}
        <Avatar.Fallback>{fallback}</Avatar.Fallback>
        {showOnlineIndicator && (
          <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 border-2 border-black translate-x-1/2 -translate-y-1/2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        )}
      </Avatar>
    </div>
  );
};

const ProfileCardHeader = ({
  name,
  availability,
  city,
  state,
}: ProfileCardHeaderProps) => {
  const availabilityBadge = availability
    ? getAvailabilityBadge(availability)
    : undefined;

  return (
    <div className="pt-16 w-full">
      <div className="w-full flex justify-between items-start">
        <div className="w-full">
          <Text
            as="h3"
            className="text-2xl font-black uppercase tracking-tight"
          >
            {name}
          </Text>
          <div className="w-full flex items-center justify-between gap-3">
            {availabilityBadge && (
              <>
                <div className="flex gap-3 items-center">
                  <span
                    className={cn(
                      "w-4 h-4 mb-0.5",
                      availabilityBadge.className
                    )}
                  />
                  <Text>{availabilityBadge.text}</Text>
                </div>
              </>
            )}
            {city && state && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <Text>
                  {city}, {state}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCardDescription = ({
  children,
  className = "",
}: ProfileCardDescriptionProps) => {
  const maxCharacters = 150;
  const truncatedText =
    typeof children === "string" && children.length > maxCharacters
      ? children.slice(0, maxCharacters) + "..."
      : children;
  return (
    <Text
      className={`text-base border-l-4 border-primary pl-3 py-1 bg-accent/10 ${className}`}
    >
      {truncatedText}
    </Text>
  );
};

const ProfileCardRating = ({
  rating,
  totalClasses,
  showText = true,
}: ProfileRatingProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <StarRating rating={rating} showText={showText} />
      <div className="h-4 w-0.5 bg-black/20" />
      <div className="text-sm font-bold text-black whitespace-nowrap">
        {totalClasses} aulas
      </div>
    </div>
  );
};

const ProfileCardSkills = ({
  skills,
  title = "Skills",
}: ProfileCardSkillsProps) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-3">
      <Text className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
        {title}
      </Text>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="bg-white hover:bg-accent transition-colors cursor-default text-sm py-1 px-3"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const ProfileActions = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 mt-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ============================================================================
// Main Export with Compound Pattern
// ============================================================================

export const ProfileCard = Object.assign(ProfileCardRoot, {
  Cover: ProfileCardCover,
  Avatar: ProfileCardAvatar,
  Content: ProfileCardContent,
  Header: ProfileCardHeader,
  Description: ProfileCardDescription,
  Skills: ProfileCardSkills,
  Rating: ProfileCardRating,
  Actions: ProfileActions,
});

// ============================================================================
// Type Exports
// ============================================================================

export type {
  ProfileCardRootProps,
  ProfileCardCoverProps,
  ProfileCardAvatarProps,
  ProfileCardContentProps,
  ProfileCardHeaderProps,
  ProfileCardDescriptionProps,
  ProfileCardSkillsProps,
};
