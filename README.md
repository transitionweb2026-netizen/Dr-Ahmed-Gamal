# Dr. Ahmed Gamal El-Borhamy — Website

A bilingual (English / Arabic, full RTL support) Next.js website for Dr. Ahmed Gamal El-Borhamy's plastic surgery practice, rebuilt from a set of static HTML mockups into a production-grade App Router application.

## Tech stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` config, native logical/RTL utilities)
- **next-intl** for i18n routing (`/en`, `/ar`) and message catalogs
- **Framer Motion** for animation, respecting `prefers-reduced-motion`
- **Radix UI primitives** (Dialog, Accordion, Direction) for accessible modals, drawers, and the FAQ accordion
- **embla-carousel-react** for carousels
- **react-hook-form + zod** for the contact form, submitted via a Next.js Server Action
- **Resend** for contact-form email delivery

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values described below
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) (or `/ar`) to view it.

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Environment variables

See `.env.example`. Two variables:

- `RESEND_API_KEY` — enables the contact form to actually send email via [Resend](https://resend.com). Without it, the form still works end-to-end (validation, loading state) but returns an honest "temporarily unavailable" error with a phone/WhatsApp fallback, instead of a fake success.
- `NEXT_PUBLIC_SITE_URL` — the absolute site URL, used for canonical links, the sitemap, and Open Graph images. Set this to the real production domain before deploying.

## Project structure

```
src/
  app/[locale]/        # routes — every page exists under /en and /ar
  i18n/                # next-intl routing, navigation, request config
  layouts/              # SiteHeader, SiteFooter, PageShell-level pieces
  sections/<page>/      # page-specific composed sections
  sections/shared/      # PageHero, ContactCtaBanner — reused across pages
  components/           # reusable, page-agnostic UI (CTAButton, modals, carousel, etc.)
  content/               # typed bilingual content data ({ en, ar } per field)
  constants/             # site info, canonical contact info, nav, icon map
  types/                  # shared TypeScript types
  lib/                    # SEO metadata/JSON-LD builders, Resend client, RTL helpers
  services/               # mail sending
messages/                 # next-intl UI copy (en.json / ar.json)
legacy-html/               # the original static HTML mockups, kept as a content reference only
```

## Important disclaimers before going live

This site was rebuilt from placeholder/mockup source material. A few things are intentionally **not real** yet and should be replaced before launch:

1. **Arabic translations are AI-generated.** All Arabic copy in `messages/ar.json` and the `ar` fields throughout `src/content/*.ts` was professionally AI-translated for a fully functional bilingual site today, but has **not** been reviewed by a native-speaker medical copywriter. Recommended before launch, especially for medical claims and procedure descriptions.
2. **Images are temporary placeholders.** Every image is hotlinked from `lh3.googleusercontent.com` (AI-prototype-generated placeholder photos), not real photography of the doctor, clinic, or patients. Replace with real, licensed photography — see `next.config.ts`'s `images.remotePatterns` when switching to a real asset host.
3. **Contact details are placeholders.** Phone numbers, WhatsApp number, email address, and clinic address in `src/constants/contactInfo.ts` are one consistent placeholder set (Cairo, Egypt), not real. Update that single file and every page picks up the change.
4. **Social media links are empty on purpose.** `contactInfo.social` is empty because no real accounts were provided — the header/footer simply don't render a social row until it's populated, rather than shipping dead links.
5. **Video content shows "coming soon."** No real video URLs exist yet. `VideoModal` is fully built and will play a real embed the moment a `youtubeId` or `vimeoId` is added to an entry in `src/content/videos.ts`.

## Legal pages

`/privacy` and `/terms` contain reasonable standard boilerplate appropriate to a medical practice site collecting consultation requests, but — like the translations — should get a real legal review before launch.
