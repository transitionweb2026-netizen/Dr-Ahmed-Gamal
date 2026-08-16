/**
 * Content-block registry — groups the flat `translations` table (one row
 * per next-intl key) into the same Page → Section → Content structure the
 * live website actually has. This is a presentation layer only: it does
 * not change the underlying keys, table, or next-intl catalog (see
 * src/i18n/request.ts) — it just lets the admin edit a whole section's
 * text (e.g. Home → Hero: eyebrow/title/description) in one form instead
 * of hunting through ~239 individual key rows in /admin/translations,
 * which stays available as a catch-all for anything not covered here.
 *
 * Deliberately NOT included as blocks (left in the flat translations
 * editor, per instruction not to build "a controller for every word"):
 * `common.*`, `form.*`, `notFound.*`, `error.*`, `languageSwitcher.*`,
 * `social.*`, `floatingContact.*`, `nav.*` (nav labels are real content
 * but live in the Navigation Menu admin via the nav_links table — these
 * translation keys are only an a11y/fallback layer behind that).
 */

export interface ContentField {
  /** Dot-path translations key, exactly as stored in the `translations` table / messages/*.json. */
  key: string;
  /** Human-readable label shown in the admin form. */
  label: string;
  multiline?: boolean;
}

export interface ContentImageField {
  /** Slug in the page_images table, e.g. "home-hero". */
  slug: string;
  /** Human-readable label shown in the admin form. */
  label: string;
}

export interface ContentBlock {
  /** URL slug, e.g. "home-hero". */
  id: string;
  /** Page group — matches the groups in nav-items.ts. */
  page: string;
  /** Section name within that page. */
  section: string;
  fields: ContentField[];
  /** Images that live in this same section — edited in this same form. */
  images?: ContentImageField[];
  /** Buttons/CTAs this section displays that are shared site-wide and edited elsewhere. */
  sharedButtons?: string[];
}

const homeHero: ContentField[] = [
  { key: "pages.home.hero.eyebrow", label: "Eyebrow (small label above title)" },
  { key: "pages.home.hero.titleLine1", label: "Title — line 1" },
  { key: "pages.home.hero.titleLine2", label: "Title — line 2 (styled in gold italic)" },
  { key: "pages.home.hero.paragraph", label: "Description", multiline: true },
];

export const contentBlocks: ContentBlock[] = [
  // ---------------------------------------------------------------- Home
  {
    id: "home-hero",
    page: "Home",
    section: "Hero",
    fields: homeHero,
    images: [{ slug: "home-hero", label: "Hero background image" }],
    sharedButtons: ["Book Consultation", "View Results"],
  },
  {
    id: "home-about",
    page: "Home",
    section: "About",
    fields: [
      { key: "pages.home.about.kicker", label: "Kicker (small label above title)" },
      { key: "pages.home.about.heading", label: "Heading" },
      { key: "pages.home.about.subheading", label: "Subheading" },
      { key: "pages.home.about.paragraph1", label: "Paragraph 1", multiline: true },
      { key: "pages.home.about.paragraph2", label: "Paragraph 2", multiline: true },
    ],
    images: [{ slug: "home-about", label: "About section background image" }],
    sharedButtons: ["Learn More"],
  },
  {
    id: "home-specialties",
    page: "Home",
    section: "Specialties (section text)",
    fields: [
      { key: "pages.home.procedures.eyebrow", label: "Eyebrow" },
      { key: "pages.home.procedures.heading", label: "Heading" },
      { key: "pages.home.procedures.cta", label: "“Show more” link text" },
    ],
    images: [{ slug: "home-specialties", label: "Specialties section background image" }],
  },
  {
    id: "home-before-after",
    page: "Home",
    section: "Before & After preview (section text)",
    fields: [
      { key: "pages.home.beforeAfter.eyebrow", label: "Eyebrow" },
      { key: "pages.home.beforeAfter.heading", label: "Heading" },
      { key: "pages.home.beforeAfter.cta", label: "“Show more” link text" },
    ],
  },
  {
    id: "home-testimonials",
    page: "Home",
    section: "Testimonials (section text)",
    fields: [
      { key: "pages.home.testimonials.eyebrow", label: "Eyebrow" },
      { key: "pages.home.testimonials.heading", label: "Heading" },
      { key: "pages.home.testimonials.cta", label: "“Show more” link text" },
    ],
  },
  {
    id: "home-milestones",
    page: "Home",
    section: "Milestones (section text)",
    fields: [
      { key: "pages.home.milestones.eyebrow", label: "Eyebrow" },
      { key: "pages.home.milestones.heading", label: "Heading" },
      { key: "pages.home.milestones.subtitle", label: "Subtitle" },
    ],
  },
  {
    id: "home-why-choose-us",
    page: "Home",
    section: "Why Choose Us (section text)",
    fields: [
      { key: "pages.home.whyChooseUs.eyebrow", label: "Eyebrow" },
      { key: "pages.home.whyChooseUs.heading", label: "Heading" },
      { key: "pages.home.whyChooseUs.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "home-why-choose-us", label: "Why Choose Us background image" }],
  },
  {
    id: "home-videos",
    page: "Home",
    section: "Featured Videos (section text)",
    fields: [
      { key: "pages.home.videos.eyebrow", label: "Eyebrow" },
      { key: "pages.home.videos.heading", label: "Heading" },
      { key: "pages.home.videos.cta", label: "“Show more” link text" },
    ],
    images: [{ slug: "home-videos", label: "Featured Videos background image" }],
  },
  {
    id: "home-final-cta",
    page: "Home",
    section: "Final CTA",
    fields: [
      { key: "pages.home.finalCta.eyebrow", label: "Eyebrow" },
      { key: "pages.home.finalCta.titleLine1", label: "Title — line 1" },
      { key: "pages.home.finalCta.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.home.finalCta.paragraph", label: "Description", multiline: true },
      { key: "pages.home.finalCta.phoneOverline", label: "Phone mockup overline text" },
    ],
    sharedButtons: ["Book Now", "Request Consultation"],
  },

  // --------------------------------------------------------------- About
  {
    id: "about-hero",
    page: "About",
    section: "Hero",
    fields: [
      { key: "pages.about.hero.eyebrow", label: "Eyebrow" },
      { key: "pages.about.hero.title", label: "Title" },
      { key: "pages.about.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "about-hero", label: "Hero background image" }],
    sharedButtons: ["Book Consultation", "View Results"],
  },
  {
    id: "about-message",
    page: "About",
    section: "Personal Message",
    fields: [
      { key: "pages.about.message.eyebrow", label: "Eyebrow" },
      { key: "pages.about.message.titleLine1", label: "Title — line 1" },
      { key: "pages.about.message.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.about.message.paragraph1", label: "Quote — paragraph 1", multiline: true },
      { key: "pages.about.message.paragraph2", label: "Quote — paragraph 2", multiline: true },
      { key: "pages.about.message.signature", label: "Signature line" },
    ],
    images: [{ slug: "about-message-portrait", label: "Personal message portrait" }],
  },
  {
    id: "about-video",
    page: "About",
    section: "Introduction Video (text)",
    fields: [
      { key: "pages.about.video.titleLine1", label: "Title — line 1" },
      { key: "pages.about.video.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.about.video.paragraph", label: "Description", multiline: true },
    ],
    sharedButtons: ["Learn More"],
  },
  {
    id: "about-procedures",
    page: "About",
    section: "Featured Procedures (section text)",
    fields: [
      { key: "pages.about.procedures.eyebrow", label: "Eyebrow" },
      { key: "pages.about.procedures.heading", label: "Heading" },
      { key: "pages.about.procedures.viewAllCta", label: "“View all” link text" },
    ],
    images: [{ slug: "about-procedures", label: "Procedures section background image" }],
  },
  {
    id: "about-timeline",
    page: "About",
    section: "Professional Journey (section text)",
    fields: [
      { key: "pages.about.timeline.eyebrow", label: "Eyebrow" },
      { key: "pages.about.timeline.heading", label: "Heading" },
    ],
  },
  {
    id: "about-gallery",
    page: "About",
    section: "Photo Gallery (section text)",
    fields: [
      { key: "pages.about.gallery.eyebrow", label: "Eyebrow" },
      { key: "pages.about.gallery.heading", label: "Heading" },
    ],
  },
  {
    id: "about-cta",
    page: "About",
    section: "Closing CTA",
    fields: [
      { key: "pages.about.cta.titleLine1", label: "Title — line 1" },
      { key: "pages.about.cta.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.about.cta.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "about-cta", label: "CTA background image" }],
    sharedButtons: ["Book Consultation", "WhatsApp", "Call Now"],
  },

  // ---------------------------------------------------------- Procedures
  {
    id: "procedures-hero",
    page: "Procedures",
    section: "Hero",
    fields: [
      { key: "pages.procedures.hero.eyebrow", label: "Eyebrow" },
      { key: "pages.procedures.hero.title", label: "Title" },
      { key: "pages.procedures.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "procedures-hero", label: "Hero background image" }],
    sharedButtons: ["Book Consultation", "View Results"],
  },
  {
    id: "procedures-grid",
    page: "Procedures",
    section: "Procedures Grid (section text)",
    fields: [
      { key: "pages.procedures.grid.heading", label: "Heading" },
      { key: "pages.procedures.grid.paragraph", label: "Description", multiline: true },
    ],
  },
  {
    id: "procedures-cta",
    page: "Procedures",
    section: "Closing CTA",
    fields: [
      { key: "pages.procedures.cta.eyebrow", label: "Eyebrow" },
      { key: "pages.procedures.cta.heading", label: "Heading" },
      { key: "pages.procedures.cta.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "procedures-cta", label: "CTA silhouette image" }],
    sharedButtons: ["Book Consultation", "WhatsApp", "Call Now"],
  },

  // ------------------------------------------------------- Before & After
  {
    id: "before-after-hero",
    page: "Before & After",
    section: "Hero",
    fields: [
      { key: "pages.beforeAfter.hero.titleLine1", label: "Title — line 1" },
      { key: "pages.beforeAfter.hero.titleLine2", label: "Title — line 2 (styled in gold gradient)" },
      { key: "pages.beforeAfter.hero.paragraph", label: "Description", multiline: true },
      { key: "pages.beforeAfter.hero.capsule.share", label: "Floating capsule — “Share” label" },
      { key: "pages.beforeAfter.hero.capsule.gallery", label: "Floating capsule — “View gallery” label" },
      { key: "pages.beforeAfter.hero.capsule.videos", label: "Floating capsule — “Watch patient videos” label" },
    ],
    images: [{ slug: "before-after-hero", label: "Hero background image" }],
    sharedButtons: ["Book Now"],
  },
  {
    id: "before-after-galleries",
    page: "Before & After",
    section: "Category Galleries (section text)",
    fields: [
      { key: "pages.beforeAfter.sectionHeading", label: "Section heading" },
      { key: "pages.beforeAfter.groups.face", label: "Category label — Face" },
      { key: "pages.beforeAfter.groups.body", label: "Category label — Body" },
      { key: "pages.beforeAfter.groups.breast", label: "Category label — Breast" },
    ],
  },
  {
    id: "before-after-testimonials",
    page: "Before & After",
    section: "Testimonials (section text)",
    fields: [{ key: "pages.beforeAfter.testimonials.heading", label: "Heading" }],
  },
  {
    id: "before-after-cta",
    page: "Before & After",
    section: "Closing CTA",
    fields: [
      { key: "pages.beforeAfter.cta.eyebrow", label: "Eyebrow" },
      { key: "pages.beforeAfter.cta.heading", label: "Heading" },
    ],
    images: [{ slug: "before-after-cta", label: "CTA portrait image" }],
    sharedButtons: ["Book Consultation", "WhatsApp", "Call Now"],
  },

  // ------------------------------------------------------- Patient Stories
  {
    id: "patient-stories-hero",
    page: "Patient Stories",
    section: "Hero",
    fields: [
      { key: "pages.patientStories.hero.eyebrow", label: "Eyebrow" },
      { key: "pages.patientStories.hero.titleLine1", label: "Title — line 1" },
      { key: "pages.patientStories.hero.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.patientStories.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "patient-stories-hero", label: "Hero background image" }],
    sharedButtons: ["Contact Us", "View Results"],
  },
  {
    id: "patient-stories-intro",
    page: "Patient Stories",
    section: "Intro (section text)",
    fields: [
      { key: "pages.patientStories.intro.heading", label: "Heading" },
      { key: "pages.patientStories.intro.paragraph", label: "Description", multiline: true },
    ],
  },
  {
    id: "patient-stories-grid",
    page: "Patient Stories",
    section: "Story Grid (text)",
    fields: [{ key: "pages.patientStories.grid.watchFullStory", label: "“Watch full story” hover label" }],
  },
  {
    id: "patient-stories-cta",
    page: "Patient Stories",
    section: "Closing CTA",
    fields: [
      { key: "pages.patientStories.cta.eyebrow", label: "Eyebrow" },
      { key: "pages.patientStories.cta.heading", label: "Heading" },
      { key: "pages.patientStories.cta.paragraph", label: "Description", multiline: true },
    ],
  },

  // ------------------------------------------------------------ Articles
  {
    id: "articles-hero",
    page: "Articles",
    section: "Hero",
    fields: [
      { key: "pages.blog.hero.eyebrow", label: "Eyebrow" },
      { key: "pages.blog.hero.titleLine1", label: "Title — line 1" },
      { key: "pages.blog.hero.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.blog.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "articles-hero", label: "Hero background image" }],
    sharedButtons: ["Contact Us", "View Results"],
  },
  {
    id: "articles-labels",
    page: "Articles",
    section: "Listing labels",
    fields: [
      { key: "pages.blog.featuredLabel", label: "“Featured” badge text" },
      { key: "pages.blog.backToArticles", label: "“Back to Articles” link text" },
    ],
  },
  {
    id: "articles-cta",
    page: "Articles",
    section: "Closing CTA",
    fields: [
      { key: "pages.blog.cta.eyebrow", label: "Eyebrow" },
      { key: "pages.blog.cta.heading", label: "Heading" },
      { key: "pages.blog.cta.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "articles-cta", label: "CTA image" }],
  },

  // -------------------------------------------------------------- Videos
  {
    id: "videos-hero",
    page: "Videos",
    section: "Hero",
    fields: [
      { key: "pages.videos.hero.titleLine1", label: "Title — line 1" },
      { key: "pages.videos.hero.titleLine2", label: "Title — line 2 (styled in gold gradient)" },
      { key: "pages.videos.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "videos-hero", label: "Hero background image" }],
    sharedButtons: ["Contact Us"],
  },
  {
    id: "videos-latest",
    page: "Videos",
    section: "Latest Videos (section text)",
    fields: [
      { key: "pages.videos.latestSection.eyebrow", label: "Eyebrow" },
      { key: "pages.videos.latestSection.heading", label: "Heading" },
      { key: "pages.videos.latestSection.paragraph", label: "Description", multiline: true },
    ],
  },
  {
    id: "videos-cta",
    page: "Videos",
    section: "Closing CTA",
    fields: [
      { key: "pages.videos.cta.titleLine1", label: "Title — line 1" },
      { key: "pages.videos.cta.titleLine2", label: "Title — line 2 (styled in gold italic)" },
      { key: "pages.videos.cta.paragraph", label: "Description", multiline: true },
      { key: "pages.videos.cta.directLine", label: "“Direct Line” card label" },
    ],
    sharedButtons: ["Book Consultation", "WhatsApp"],
  },

  // ---------------------------------------------------------------- FAQ
  {
    id: "faq-hero",
    page: "FAQ",
    section: "Hero",
    fields: [
      { key: "pages.faq.hero.eyebrow", label: "Eyebrow" },
      { key: "pages.faq.hero.title", label: "Title" },
      { key: "pages.faq.hero.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "faq-hero", label: "Hero background image" }],
    sharedButtons: ["Contact Us", "View Results"],
  },
  {
    id: "faq-intro",
    page: "FAQ",
    section: "Intro (section text)",
    fields: [
      { key: "pages.faq.intro.eyebrow", label: "Eyebrow" },
      { key: "pages.faq.intro.heading", label: "Heading" },
      { key: "pages.faq.intro.paragraph", label: "Description", multiline: true },
    ],
  },
  {
    id: "faq-cta",
    page: "FAQ",
    section: "Closing CTA",
    fields: [
      { key: "pages.faq.cta.eyebrow", label: "Eyebrow" },
      { key: "pages.faq.cta.heading", label: "Heading" },
      { key: "pages.faq.cta.paragraph", label: "Description", multiline: true },
    ],
  },

  // ------------------------------------------------------------- Contact
  {
    id: "contact-hero",
    page: "Contact",
    section: "Hero",
    fields: [
      { key: "pages.contact.hero.title", label: "Title" },
      { key: "pages.contact.hero.paragraph", label: "Description", multiline: true },
      { key: "pages.contact.hero.capsule.call", label: "Floating capsule — “Call Us” label" },
      { key: "pages.contact.hero.capsule.email", label: "Floating capsule — “Email” label" },
      { key: "pages.contact.hero.capsule.directions", label: "Floating capsule — “Directions” label" },
    ],
    images: [{ slug: "contact-hero", label: "Hero background image" }],
    sharedButtons: ["WhatsApp"],
  },
  {
    id: "contact-form-section",
    page: "Contact",
    section: "Form Section (text)",
    fields: [
      { key: "pages.contact.formSection.heading", label: "Heading" },
      { key: "pages.contact.formSection.paragraph", label: "Description", multiline: true },
    ],
    images: [{ slug: "contact-form-portrait", label: "Form section portrait" }],
  },
  {
    id: "contact-location",
    page: "Contact",
    section: "Location (text)",
    fields: [
      { key: "pages.contact.location.heading", label: "Heading" },
      { key: "pages.contact.location.tagline", label: "Tagline" },
      { key: "pages.contact.location.imageAlt", label: "Location image description (for accessibility)" },
    ],
    images: [{ slug: "contact-location", label: "Clinic location image" }],
  },
  {
    id: "contact-info-grid",
    page: "Contact",
    section: "Contact Info Grid — labels",
    fields: [
      { key: "pages.contact.contactGrid.phoneTitle", label: "Card label — Phone" },
      { key: "pages.contact.contactGrid.emailTitle", label: "Card label — Email" },
      { key: "pages.contact.contactGrid.hoursTitle", label: "Card label — Working Hours" },
      { key: "pages.contact.contactGrid.socialTitle", label: "Card label — Social" },
      { key: "pages.contact.contactGrid.emergencyPhoneLabel", label: "Emergency phone tag" },
    ],
  },
  {
    id: "contact-closing-cta",
    page: "Contact",
    section: "Closing CTA",
    fields: [
      { key: "pages.contact.ctaBanner.heading", label: "Heading" },
      { key: "pages.contact.ctaBanner.paragraph", label: "Description", multiline: true },
    ],
    sharedButtons: ["WhatsApp"],
  },

  // -------------------------------------------------------------- Legal
  {
    id: "legal-privacy",
    page: "Legal",
    section: "Privacy Policy",
    fields: [
      { key: "legal.privacy.title", label: "Page title" },
      { key: "legal.privacy.intro", label: "Intro paragraph", multiline: true },
      { key: "legal.privacy.sections.0.heading", label: "Section 1 — heading" },
      { key: "legal.privacy.sections.0.body", label: "Section 1 — body", multiline: true },
      { key: "legal.privacy.sections.1.heading", label: "Section 2 — heading" },
      { key: "legal.privacy.sections.1.body", label: "Section 2 — body", multiline: true },
      { key: "legal.privacy.sections.2.heading", label: "Section 3 — heading" },
      { key: "legal.privacy.sections.2.body", label: "Section 3 — body", multiline: true },
      { key: "legal.privacy.sections.3.heading", label: "Section 4 — heading" },
      { key: "legal.privacy.sections.3.body", label: "Section 4 — body", multiline: true },
      { key: "legal.privacy.sections.4.heading", label: "Section 5 — heading" },
      { key: "legal.privacy.sections.4.body", label: "Section 5 — body", multiline: true },
      { key: "legal.privacy.sections.5.heading", label: "Section 6 — heading" },
      { key: "legal.privacy.sections.5.body", label: "Section 6 — body", multiline: true },
      { key: "legal.privacy.sections.6.heading", label: "Section 7 — heading" },
      { key: "legal.privacy.sections.6.body", label: "Section 7 — body", multiline: true },
    ],
  },
  {
    id: "legal-terms",
    page: "Legal",
    section: "Terms of Service",
    fields: [
      { key: "legal.terms.title", label: "Page title" },
      { key: "legal.terms.intro", label: "Intro paragraph", multiline: true },
      { key: "legal.terms.sections.0.heading", label: "Section 1 — heading" },
      { key: "legal.terms.sections.0.body", label: "Section 1 — body", multiline: true },
      { key: "legal.terms.sections.1.heading", label: "Section 2 — heading" },
      { key: "legal.terms.sections.1.body", label: "Section 2 — body", multiline: true },
      { key: "legal.terms.sections.2.heading", label: "Section 3 — heading" },
      { key: "legal.terms.sections.2.body", label: "Section 3 — body", multiline: true },
      { key: "legal.terms.sections.3.heading", label: "Section 4 — heading" },
      { key: "legal.terms.sections.3.body", label: "Section 4 — body", multiline: true },
      { key: "legal.terms.sections.4.heading", label: "Section 5 — heading" },
      { key: "legal.terms.sections.4.body", label: "Section 5 — body", multiline: true },
      { key: "legal.terms.sections.5.heading", label: "Section 6 — heading" },
      { key: "legal.terms.sections.5.body", label: "Section 6 — body", multiline: true },
      { key: "legal.terms.sections.6.heading", label: "Section 7 — heading" },
      { key: "legal.terms.sections.6.body", label: "Section 7 — body", multiline: true },
    ],
  },

  // ---------------------------------------------------------- Site-wide
  {
    id: "site-buttons",
    page: "Site-wide",
    section: "Buttons & CTAs (used across many pages)",
    fields: [
      { key: "cta.bookConsultation", label: "Book Consultation" },
      { key: "cta.bookNow", label: "Book Now" },
      { key: "cta.requestConsultation", label: "Request Consultation" },
      { key: "cta.viewResults", label: "View Results" },
      { key: "cta.contactUs", label: "Contact Us" },
      { key: "cta.callNow", label: "Call Now" },
      { key: "cta.whatsapp", label: "WhatsApp" },
      { key: "cta.continueOnWhatsapp", label: "Continue on WhatsApp" },
      { key: "cta.learnMore", label: "Learn More" },
      { key: "cta.showMore", label: "Show More" },
      { key: "cta.readMore", label: "Read More" },
      { key: "cta.viewAll", label: "View All" },
      { key: "cta.getDirections", label: "Open in Google Maps" },
      { key: "cta.sendMessage", label: "Send Message" },
    ],
  },
  {
    id: "site-footer",
    page: "Site-wide",
    section: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", multiline: true },
      { key: "footer.quickLinksTitle", label: "“Quick Links” column title" },
      { key: "footer.proceduresTitle", label: "“Procedures” column title" },
      { key: "footer.contactTitle", label: "“Contact Info” column title" },
      { key: "footer.hoursTitle", label: "“Working Hours” column title" },
      { key: "footer.rightsReserved", label: "Copyright line (use {year} for the current year)" },
      { key: "footer.privacyPolicy", label: "“Privacy Policy” link text" },
      { key: "footer.termsOfService", label: "“Terms of Service” link text" },
      { key: "footer.developedBy", label: "“Developed by” credit line" },
      { key: "footer.categories.facial", label: "Category link — Facial Procedures" },
      { key: "footer.categories.breast", label: "Category link — Breast Surgery" },
      { key: "footer.categories.body", label: "Category link — Body Contouring" },
      { key: "footer.categories.nonSurgical", label: "Category link — Non-Surgical" },
    ],
  },
  {
    id: "site-identity-tagline",
    page: "Site-wide",
    section: "Browser tab description",
    fields: [{ key: "site.tagline", label: "Tagline (shown in browser tab / search results)" }],
  },
  {
    id: "site-procedure-labels",
    page: "Site-wide",
    section: "Procedure detail page — labels",
    fields: [
      { key: "procedures.overview", label: "“Overview” heading" },
      { key: "procedures.recovery", label: "“Recovery” heading" },
      { key: "procedures.faqTitle", label: "“Frequently Asked Questions” heading" },
      { key: "procedures.relatedProcedures", label: "“Related Procedures” heading" },
      { key: "procedures.allProcedures", label: "“All Procedures” back-link text" },
      { key: "procedures.category.face", label: "Category label — Face" },
      { key: "procedures.category.body", label: "Category label — Body" },
      { key: "procedures.category.breast", label: "Category label — Breast" },
      { key: "procedures.category.non-surgical", label: "Category label — Non-Surgical" },
    ],
  },
];

export function getContentBlock(id: string): ContentBlock | undefined {
  return contentBlocks.find((block) => block.id === id);
}
