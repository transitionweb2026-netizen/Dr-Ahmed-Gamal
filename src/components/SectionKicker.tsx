import { cn } from "@/utils/cn";

interface SectionKickerProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "start";
}

/**
 * Gold-gradient eyebrow + divider-flanked heading treatment used across the
 * legacy mockups' major section headers (Certifications, Why Choose Us,
 * Services, Patient Stories, Videos, FAQ).
 */
export function SectionKicker({ eyebrow, heading, subtitle, className, align = "center" }: SectionKickerProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-start", className)}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold opacity-80">{eyebrow}</p>
      <div className={cn("mb-4 flex items-center gap-6", isCenter ? "justify-center" : "justify-start")}>
        {isCenter && (
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
        )}
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] font-serif text-3xl drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)] md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <div className="h-px w-12 bg-gradient-to-l from-transparent via-brand-gold/40 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
      </div>
      {subtitle && (
        <p className={cn("font-light tracking-wide text-brand-light/60", isCenter && "mx-auto max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
