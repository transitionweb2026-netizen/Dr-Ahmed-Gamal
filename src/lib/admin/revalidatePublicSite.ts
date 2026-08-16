import { revalidatePath } from "next/cache";

/**
 * Every admin write must call this after a successful DB mutation.
 *
 * The public site is ISR-cached (`export const revalidate = 60` on
 * src/app/[locale]/layout.tsx) so it eventually picks up CMS edits on its
 * own — but only after that window elapses. Without an explicit
 * on-demand revalidation, a saved change can sit invisible on the live
 * site for up to a minute, which reads as "the CMS doesn't work." This
 * busts the whole locale route tree immediately instead, since CMS
 * content (procedures, testimonials, videos, etc.) is fetched across many
 * pages at once and it's safer to over-invalidate than to miss one.
 */
export function revalidatePublicSite() {
  // revalidatePath keys cache entries by route FILE STRUCTURE, not by
  // resolved URL — for a dynamic segment this must be the literal bracket
  // pattern matching src/app/[locale]/layout.tsx (see revalidatePath docs:
  // "Revalidating a Layout path"), not an instantiated value like "/en".
  // A resolved value here would silently no-op instead of erroring.
  revalidatePath("/[locale]", "layout");
}
