# Legacy HTML (reference only — not served)

These 9 files are the original static HTML mockups this project was rebuilt from. They are kept here purely as a **content source-of-truth reference** (original copy, section order, image URLs) and are not part of the Next.js application and not deployed.

Two things to know when consulting them:

1. Only `Home.html` and `About.html` reflect the real "Dr. Ahmed Gamal" brand. The other 7 files (`Services.html`, `Cases & Reviews.html`, `Patient Stories.html`, `Blogs.html`, `Videos.html`, `Questions.html`, `COntact Us.html`) are a leftover generic SaaS template with the wrong nav, footer, and contact info — only their medical *content* (procedure lists, FAQ items, article/video topics, testimonials) was carried into the rebuild, not their chrome or branding.
2. Contact details found here (phone numbers, addresses, emails) are inconsistent placeholder/demo data across files and were **not** used as-is in the rebuild — see `src/constants/contactInfo.ts` in the Next.js app for the single canonical placeholder set.

The real, current content lives in `src/content/*.ts` and `messages/*.json` at the project root.
