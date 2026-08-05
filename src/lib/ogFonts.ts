const LEGACY_USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36";

/**
 * Fetches a Google Font as raw TTF bytes for use with next/og's ImageResponse,
 * which (via satori) needs actual font data rather than a CSS @font-face link.
 * Requesting the CSS with a legacy user-agent makes Google Fonts serve a TTF
 * (modern browsers get woff2, which satori cannot parse).
 */
export async function fetchGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": LEGACY_USER_AGENT },
  }).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/);
  if (!match) {
    throw new Error(`Could not resolve a TTF URL for ${family} ${weight}`);
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}
