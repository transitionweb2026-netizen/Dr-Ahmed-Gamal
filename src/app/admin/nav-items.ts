/**
 * Admin navigation, grouped by the public website's own page/section
 * structure instead of by database table — the same underlying content
 * section (e.g. Procedures, Testimonials, Videos) legitimately appears
 * under more than one page group when the live site reuses that data in
 * more than one place, each with a hint describing exactly what it
 * controls there. This file is the single source both the sidebar
 * (layout.tsx) and the dashboard grid (page.tsx) render from.
 *
 * Page text (headings, paragraphs, button copy) links straight to its
 * content block under /admin/content/<id> — see src/app/admin/content-blocks.ts
 * — instead of the flat, 200+-row /admin/translations editor.
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
      { href: "/admin/content/home-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      { href: "/admin/stats", label: "Statistics strip", hint: "4 numbers — toggle “Featured on Home”" },
      { href: "/admin/content/home-about", label: "About", hint: "Heading, description & background image" },
      {
        href: "/admin/procedures",
        label: "Specialties (featured procedures)",
        hint: "Cards — toggle “Featured on Home”, ordered by Display Order",
      },
      { href: "/admin/content/home-specialties", label: "Specialties (section intro + image)" },
      { href: "/admin/before-after", label: "Before & After preview", hint: "6 cards — toggle “Featured on Home”" },
      { href: "/admin/content/home-before-after", label: "Before & After section text" },
      { href: "/admin/testimonials", label: "Testimonials", hint: "Toggle “Featured on Home”" },
      { href: "/admin/content/home-testimonials", label: "Testimonials section text" },
      { href: "/admin/milestones", label: "Milestones carousel", hint: "Toggle “Featured on Home”" },
      { href: "/admin/content/home-milestones", label: "Milestones section text" },
      { href: "/admin/why-choose-us", label: "Why Choose Us checklist" },
      { href: "/admin/content/home-why-choose-us", label: "Why Choose Us (section intro + image)" },
      { href: "/admin/videos", label: "Featured videos", hint: "First 3 videos by Display Order" },
      { href: "/admin/content/home-videos", label: "Featured Videos (section intro + image)" },
      { href: "/admin/content/home-final-cta", label: "Final CTA text" },
    ],
  },
  {
    page: "About",
    items: [
      { href: "/admin/content/about-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      { href: "/admin/content/about-message", label: "Personal Message", hint: "Quote, signature & portrait image" },
      { href: "/admin/content/about-video", label: "Introduction video text" },
      { href: "/admin/stats", label: "Statistics strip", hint: "Toggle “Featured on About”" },
      {
        href: "/admin/procedures",
        label: "Featured procedures",
        hint: "Same cards as Home — toggle “Featured on Home”",
      },
      { href: "/admin/content/about-procedures", label: "Featured Procedures (section intro + image)" },
      { href: "/admin/milestones", label: "Professional journey timeline", hint: "Toggle “Featured on About”" },
      { href: "/admin/content/about-timeline", label: "Professional journey section text" },
      { href: "/admin/content/about-gallery", label: "Photo gallery section text" },
      { href: "/admin/content/about-cta", label: "Closing CTA", hint: "Heading, description & background image" },
    ],
  },
  {
    page: "Procedures",
    items: [
      { href: "/admin/content/procedures-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      {
        href: "/admin/procedures",
        label: "All procedures",
        hint: "Name, description, image, category, icon, overview, recovery, FAQ",
      },
      { href: "/admin/content/procedures-grid", label: "Procedures grid section text" },
      { href: "/admin/content/procedures-cta", label: "Closing CTA", hint: "Heading, description & silhouette image" },
    ],
  },
  {
    page: "Before & After",
    items: [
      { href: "/admin/content/before-after-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      {
        href: "/admin/before-after",
        label: "Case gallery",
        hint: "Toggle “Show in category gallery” to include a case",
      },
      { href: "/admin/content/before-after-galleries", label: "Category galleries section text" },
      { href: "/admin/testimonials", label: "Testimonials", hint: "Testimonials not featured on Home appear here" },
      { href: "/admin/content/before-after-testimonials", label: "Testimonials section text" },
      { href: "/admin/content/before-after-cta", label: "Closing CTA", hint: "Heading & portrait image" },
    ],
  },
  {
    page: "Patient Stories",
    items: [
      { href: "/admin/content/patient-stories-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      { href: "/admin/content/patient-stories-intro", label: "Intro section text" },
      { href: "/admin/videos", label: "Patient story videos", hint: "Set Video Type = “Patient Story”" },
      { href: "/admin/content/patient-stories-grid", label: "Story grid text" },
      { href: "/admin/content/patient-stories-cta", label: "Closing CTA text" },
    ],
  },
  {
    page: "Videos",
    items: [
      { href: "/admin/content/videos-hero", label: "Hero", hint: "Title, description & background image" },
      { href: "/admin/videos", label: "All videos", hint: "Set Video Type = “Educational” to show here" },
      { href: "/admin/content/videos-latest", label: "Latest videos section text" },
      { href: "/admin/content/videos-cta", label: "Closing CTA text" },
    ],
  },
  {
    page: "Articles",
    items: [
      { href: "/admin/content/articles-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      { href: "/admin/articles", label: "All articles", hint: "Toggle “Featured” for the hero article" },
      { href: "/admin/content/articles-labels", label: "Listing labels" },
      { href: "/admin/content/articles-cta", label: "Closing CTA", hint: "Heading, description & image" },
    ],
  },
  {
    page: "FAQ",
    items: [
      { href: "/admin/content/faq-hero", label: "Hero", hint: "Title, description, buttons & background image" },
      { href: "/admin/content/faq-intro", label: "Intro section text" },
      { href: "/admin/faq", label: "FAQ items" },
      { href: "/admin/content/faq-cta", label: "Closing CTA text" },
    ],
  },
  {
    page: "Contact",
    items: [
      { href: "/admin/content/contact-hero", label: "Hero", hint: "Title, description, capsule labels & background image" },
      { href: "/admin/content/contact-form-section", label: "Form Section", hint: "Heading, description & portrait image" },
      { href: "/admin/contact-info", label: "Contact details", hint: "Phone, WhatsApp, email, address, hours, social" },
      { href: "/admin/content/contact-location", label: "Location", hint: "Heading, tagline & clinic image" },
      { href: "/admin/procedures", label: "Procedure dropdown", hint: "Populates the contact form's procedure selector" },
      { href: "/admin/content/contact-info-grid", label: "Contact info grid — labels" },
      { href: "/admin/content/contact-closing-cta", label: "Closing CTA text" },
    ],
  },
  {
    page: "Legal",
    items: [
      { href: "/admin/content/legal-privacy", label: "Privacy Policy" },
      { href: "/admin/content/legal-terms", label: "Terms of Service" },
    ],
  },
  {
    page: "Site-wide",
    items: [
      { href: "/admin/nav-links", label: "Navigation menu", hint: "Header & footer quick links" },
      { href: "/admin/site-settings", label: "Site identity", hint: "Name, short name, logo — header, footer, browser tab, share previews" },
      { href: "/admin/content/site-identity-tagline", label: "Browser tab description" },
      { href: "/admin/content/site-footer", label: "Footer text" },
      { href: "/admin/content/site-buttons", label: "Buttons & CTAs", hint: "Shared button text used across most pages" },
      { href: "/admin/content/site-procedure-labels", label: "Procedure detail page — labels" },
      { href: "/admin/seo", label: "SEO metadata", hint: "Per-page meta title, description & share image" },
      {
        href: "/admin/translations",
        label: "All site text (advanced)",
        hint: "Every UI string on the site, including system labels not covered above",
      },
    ],
  },
];
