"use client";

import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { Textarea } from "@/components/retroui/Textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { reviewSchema, type ReviewFormValues } from "@/mutations/booking/booking-review.mutation";
import { useState } from "react";

interface ReviewFormProps {
  onSubmit: (values: ReviewFormValues) => void;
  isSubmitting?: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting = false }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const { field: ratingField } = useController({ name: "rating", control });
  const { field: commentField } = useController({ name: "comment", control });
  const comment = watch("comment") ?? "";
  const rating = watch("rating");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        <div>
          <Text variant="label">Avaliação</Text>
          <Text variant="body">Como foi sua experiência nesta aula?</Text>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => ratingField.onChange(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={cn(
                    "w-12 h-12 text-black transition-colors",
                    hoveredRating >= star || rating >= star
                      ? "fill-yellow-400"
                      : "fill-gray-100"
                  )}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
          {rating > 0 && <Text variant="h5">{rating}.0</Text>}
          {errors.rating && (
            <Text variant="caption" className="text-red-500">
              {errors.rating.message}
            </Text>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Text variant="label" as="label" htmlFor="review-comment">
            Comentário (opcional)
          </Text>
          <Textarea
            id="review-comment"
            placeholder="Conte-nos sobre sua experiência nesta aula..."
            maxLength={1000}
            disabled={isSubmitting}
            aria-invalid={!!errors.comment}
            {...commentField}
            value={commentField.value ?? ""}
          />
          {errors.comment && (
            <Text variant="caption" className="text-red-500">
              {errors.comment.message}
            </Text>
          )}
          <div className="text-right">
            <Text variant="caption">{comment.length}/1000 caracteres</Text>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="flex-1"
          disabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </div>
    </form>
  );
}
