import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div dir="ltr" className={cn("flex gap-0.5 text-brand-gold", className)} aria-hidden>
      {Array.from({ length: rating }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}
