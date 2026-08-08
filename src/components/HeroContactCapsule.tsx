import type { IconName } from "@/constants/iconMap";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

export interface CapsuleLink {
  icon: IconName;
  href: string;
  /** Visible label — omit for an icon-only link (needs `ariaLabel` instead). */
  label?: string;
  ariaLabel?: string;
}

interface HeroContactCapsuleProps {
  /** Consecutive groups of links, separated by a vertical divider. */
  groups: CapsuleLink[][];
  /** "end" = bottom-right in LTR / bottom-left in RTL (logical, auto-flips). */
  align?: "center" | "start" | "end";
  className?: string;
}

/**
 * The floating glass-panel "quick contact" pill anchored near the bottom of
 * every reference hero (icon links, optionally grouped by a divider).
 */
export function HeroContactCapsule({ groups, align = "center", className }: HeroContactCapsuleProps) {
  return (
    <div
      className={cn(
        "absolute bottom-8 z-30 w-auto max-w-[90vw] sm:bottom-12",
        align === "center"
          ? "start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
          : align === "start"
            ? "start-5 md:start-16"
            : "end-5 md:end-16",
        className,
      )}
    >
      <div
        className="glass-panel group relative flex items-center gap-4 overflow-hidden rounded-full border border-brand-gold/20 px-6 py-3 shadow-2xl transition-all duration-500 hover:shadow-gold/20 sm:gap-6"
        style={{ background: "rgba(26, 18, 11, 0.6)", backdropFilter: "blur(20px)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-4 sm:gap-6">
            {groupIndex > 0 && <div className="h-6 w-px bg-brand-gold/20" aria-hidden />}
            <div className="flex items-center gap-4 sm:gap-6">
              {group.map((link) =>
                link.label ? (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="group/link flex items-center gap-2 text-brand-light transition-colors hover:text-brand-gold"
                  >
                    <Icon
                      name={link.icon}
                      className="h-5 w-5 transition-transform duration-300 group-hover/link:scale-110"
                    />
                    <span className="whitespace-nowrap text-sm font-medium tracking-wider">
                      {link.label}
                    </span>
                  </a>
                ) : (
                  <a
                    key={link.href + link.icon}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="flex items-center text-brand-light transition-all duration-300 hover:scale-110 hover:text-brand-gold"
                  >
                    <Icon name={link.icon} className="h-5 w-5" />
                  </a>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
