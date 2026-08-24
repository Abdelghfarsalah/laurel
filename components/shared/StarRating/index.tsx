"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  size?: string;
}

export default function StarRating({ value, size = "size-4" }: StarRatingProps) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i <= rounded ? "text-amber-400" : "text-neutral-l-grey/50"
          }`}
          fill={i <= rounded ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
