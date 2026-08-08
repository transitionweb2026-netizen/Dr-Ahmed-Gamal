import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
