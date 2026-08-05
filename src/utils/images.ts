/**
 * Cycles through a pool of distinct image URLs to fill a grid of `count`
 * items, instead of repeating a single placeholder image many times.
 * `offset` lets different sections drawing from the same pool start at
 * different points so they don't all show the same first image.
 */
export function getGalleryImages(pool: string[], count: number, offset = 0): string[] {
  if (pool.length === 0) return [];
  return Array.from({ length: count }, (_, i) => pool[(i + offset) % pool.length]);
}
