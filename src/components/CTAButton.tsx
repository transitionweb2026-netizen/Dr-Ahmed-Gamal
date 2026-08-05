import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { buttonVariants, type ButtonVariant, type ButtonSize } from "@/components/ui/buttonStyles";
import { cn } from "@/utils/cn";

interface CTAButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
}

const EXTERNAL_PREFIXES = ["http://", "https://", "tel:", "mailto:"];

export function CTAButton({
  href,
  children,
  variant = "solid",
  size = "md",
  showArrow = false,
  className,
  ...rest
}: CTAButtonProps) {
  const isExternal = EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix));
  const classes = cn(buttonVariants({ variant, size }), "group", className);

  const content = (
    <>
      {variant === "solid" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {showArrow && (
          <Icon
            name="arrow_forward"
            className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        )}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
