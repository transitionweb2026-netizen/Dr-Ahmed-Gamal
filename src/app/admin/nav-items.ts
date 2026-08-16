/**
 * Admin navigation, grouped by the public website's own page/section
 * structure instead of by database table — the same underlying content
 * section (e.g. Procedures, Testimonials, Videos) legitimately appears
 * under more than one page group when the live site reuses that data in
 * more than one place, each with a hint describing exactly what it
 * controls there. This file is the single source both the sidebar
 * (layout.tsx) and the dashboard grid (page.tsx) render from.
 */

export interface AdminNavItem {
  href: string;
  label: string;
  /** What this link controls on THIS page specifically. */
  hint?: string;
}

export interface AdminNavGroup {
  page: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    page: "Home",
    items: [
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.home.”" },
      { href: "/admin/stats", label: "Statistics strip", hint: "4 numbers — toggle “Featured on Home”" },
      {
        href: "/admin/procedures",
        label: "Specialties (featured procedures)",
        hint: "Cards — toggle “Featured on Home”, ordered by Display Order",
      },
      { href: "/admin/before-after", label: "Before & After preview", hint: "6 cards — toggle “Featured on Home”" },
      { href: "/admin/testimonials", label: "Testimonials", hint: "Toggle “Featured on Home”" },
      { href: "/admin/milestones", label: "Milestones carousel", hint: "Toggle “Featured on Home”" },
      { href: "/admin/why-choose-us", label: "Why Choose Us checklist" },
      { href: "/admin/videos", label: "Featured videos", hint: "First 3 videos by Display Order" },
      { href: "/admin/page-images#home", label: "Page images", hint: "Hero & section background images" },
    ],
  },
  {
    page: "About",
    items: [
      {
        href: "/admin/translations",
        label: "Hero, message & section text",
        hint: "Search keys starting with “pages.about.”",
      },
      { href: "/admin/stats", label: "Statistics strip", hint: "Toggle “Featured on About”" },
      {
        href: "/admin/procedures",
        label: "Featured procedures",
        hint: "Same cards as Home — toggle “Featured on Home”",
      },
      { href: "/admin/milestones", label: "Professional journey timeline", hint: "Toggle “Featured on About”" },
      { href: "/admin/videos", label: "Introduction video", hint: "The “meet-dr-ahmed” entry" },
      { href: "/admin/page-images#about", label: "Page images", hint: "Hero & section background images" },
    ],
  },
  {
    page: "Procedures",
    items: [
      {
        href: "/admin/procedures",
        label: "All procedures",
        hint: "Name, description, image, category, icon, overview, recovery, FAQ",
      },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.procedures.”" },
      { href: "/admin/page-images#procedures", label: "Page images", hint: "Hero & CTA background images" },
    ],
  },
  {
    page: "Before & After",
    items: [
      {
        href: "/admin/before-after",
        label: "Case gallery",
        hint: "Toggle “Show in category gallery” to include a case",
      },
      { href: "/admin/testimonials", label: "Testimonials", hint: "Testimonials not featured on Home appear here" },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.beforeAfter.”" },
      { href: "/admin/page-images#before-after", label: "Page images", hint: "Hero & CTA background images" },
    ],
  },
  {
    page: "Patient Stories",
    items: [
      { href: "/admin/videos", label: "Patient story videos", hint: "Set Video Type = “Patient Story”" },
      {
        href: "/admin/translations",
        label: "Hero & section text",
        hint: "Search keys starting with “pages.patientStories.”",
      },
      { href: "/admin/page-images#patient-stories", label: "Page images", hint: "Hero background image" },
    ],
  },
  {
    page: "Videos",
    items: [
      { href: "/admin/videos", label: "All videos", hint: "Set Video Type = “Educational” to show here" },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.videos.”" },
      { href: "/admin/page-images#videos", label: "Page images", hint: "Hero background image" },
    ],
  },
  {
    page: "Articles",
    items: [
      { href: "/admin/articles", label: "All articles", hint: "Toggle “Featured” for the hero article" },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.blog.”" },
      { href: "/admin/page-images#articles", label: "Page images", hint: "Hero & CTA background images" },
    ],
  },
  {
    page: "FAQ",
    items: [
      { href: "/admin/faq", label: "FAQ items" },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.faq.”" },
      { href: "/admin/page-images#faq", label: "Page images", hint: "Hero background image" },
    ],
  },
  {
    page: "Contact",
    items: [
      { href: "/admin/contact-info", label: "Contact details", hint: "Phone, WhatsApp, email, address, hours, social" },
      { href: "/admin/procedures", label: "Procedure dropdown", hint: "Populates the contact form's procedure selector" },
      { href: "/admin/translations", label: "Hero & section text", hint: "Search keys starting with “pages.contact.”" },
      { href: "/admin/page-images#contact", label: "Page images", hint: "Hero, portrait & location images" },
    ],
  },
  {
    page: "Site-wide",
    items: [
      { href: "/admin/nav-links", label: "Navigation menu", hint: "Header & footer quick links" },
      { href: "/admin/site-settings", label: "Site identity", hint: "Name, short name, logo — header, footer, browser tab, share previews" },
      { href: "/admin/seo", label: "SEO metadata", hint: "Per-page meta title, description & share image" },
      { href: "/admin/translations", label: "All site text", hint: "Every UI string on the site, searchable by key" },
    ],
  },
];
