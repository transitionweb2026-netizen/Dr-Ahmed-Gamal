/** URL-safe slug for a page group name, e.g. "Before & After" -> "before-after". */
export function pageSlugify(page: string): string {
  return page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
