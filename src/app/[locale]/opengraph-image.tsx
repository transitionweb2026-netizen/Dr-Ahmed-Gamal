import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { site } from "@/constants/site";
import { fetchGoogleFont } from "@/lib/ogFonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { name: string; tagline: string; family: string }> = {
  en: { name: site.name, tagline: "Artistry in Aesthetics", family: "Libre Caslon Text" },
  ar: { name: "د. أحمد جمال البرهامي", tagline: "براعة في فنون التجميل", family: "Tajawal" },
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const copy = COPY[locale];

  const fontData = await fetchGoogleFont(copy.family, 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #131313 0%, #1c1b1b 100%)",
          color: "#f4ede4",
          padding: "80px",
          direction: dir,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "6px 28px",
            border: "1px solid rgba(212,175,55,0.5)",
            borderRadius: 999,
            color: "#d4af37",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          {copy.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontFamily: copy.family,
            color: "#f4ede4",
            textAlign: "center",
          }}
        >
          {copy.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            width: 120,
            height: 2,
            background: "#d4af37",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: copy.family, data: fontData, weight: 700, style: "normal" }],
    },
  );
}
