import { cn } from "@/utils/cn";

export type ButtonVariant = "solid" | "outline" | "flat" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  solid:
    "text-white bg-gradient-to-b from-[#a67c00] to-[#5c4000] border border-brand-gold/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-1",
  outline:
    "text-brand-gold bg-[#5c4000]/20 backdrop-blur-md border border-brand-gold/40 hover:border-brand-gold/80 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1",
  flat: "text-brand-darker bg-brand-gold hover:bg-white shadow-gold",
  ghost:
    "text-brand-gold normal-case tracking-normal font-normal rounded-none px-0 py-0 hover:gap-3",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-8 py-3.5 text-xs",
  lg: "px-10 py-4 text-sm",
};

export function buttonVariants({
  variant = "solid",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}
