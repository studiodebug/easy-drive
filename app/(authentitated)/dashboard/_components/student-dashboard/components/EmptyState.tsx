import { Card } from "@/components/retroui/Card";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionButton?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  actionButton,
}: EmptyStateProps) {
  return (
    <Card className="w-full p-12 bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative" aria-hidden="true">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-foreground">{title}</h3>

        <p className="text-muted-foreground text-center max-w-2xl">
          {description}
        </p>

        {actionButton && <div className="mt-2">{actionButton}</div>}
      </div>
    </Card>
  );
}
