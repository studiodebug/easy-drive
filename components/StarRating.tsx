import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
  showText?: boolean;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  className = "",
  showText = false,
}: StarRatingProps) {
  // Ensure rating is valid
  const validRating = Math.max(0, Math.min(rating, maxStars));
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < fullStars;
        const isHalf = !isFilled && index === fullStars && hasHalfStar;

        return (
          <div key={index} className="relative">
            <Star
              className={`
                text-black
                ${isFilled ? "fill-yellow-400" : "fill-gray-100"}
              `}
              size={size}
              strokeWidth={2}
            />
          </div>
        );
      })}
      {showText && (
        <span className="ml-1 text-sm font-bold text-black font-mono">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
