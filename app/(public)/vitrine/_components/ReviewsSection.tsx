"use client";

import type { Review } from "@/types/instructor";
import { Card } from "@/components/retroui/Card";
import { Avatar } from "@/components/retroui/Avatar";
import { StarRating } from "@/components/StarRating";
import { cn } from "@/lib/utils";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black mb-4">Avaliações dos Alunos</h2>
        <p className="text-muted-foreground text-center py-8">
          Ainda não há avaliações para este instrutor.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-6">Avaliações dos Alunos</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-2 border-black p-4 bg-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <Avatar className="h-12 w-12 border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Avatar.Image
                    src={review.studentAvatar}
                    alt={review.studentName}
                  />
                  <Avatar.Fallback className="bg-purple-200 text-black font-bold border-2 border-black">
                    {review.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-black text-black">
                    {review.studentName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
                <p className="text-base text-black/90 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
