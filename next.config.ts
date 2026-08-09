import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Dev-only build indicator badge: FloatingActionButtons and the hero
  // capsule both live bottom-end (right in EN), and the mobile nav trigger
  // lives top-end — bottom-start is the one corner clear of all of them.
  // No effect on production builds.
  devIndicators: {
    position: "bottom-left",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Supabase Storage — admin-uploaded CMS images (src/components/admin/ImageUploadField.tsx).
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  async redirects() {
    return [
      // The Blog page was renamed to Articles — preserve old links/bookmarks.
      { source: "/:locale/blog", destination: "/:locale/articles", permanent: true },
      { source: "/:locale/blog/:slug", destination: "/:locale/articles/:slug", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
