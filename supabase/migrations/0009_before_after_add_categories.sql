-- Add 3 new before_after_cases categories: Lip Repair, Eyelid Lifting, and
-- Scar Revision, alongside the existing nose/gynecomastia/otoplasty. Nose,
-- Gynecomastia, and Otoplasty also gain more cards (see
-- scripts/add-before-after-cards-2026-09-28.mjs) — this migration only
-- widens the category constraint.
alter table before_after_cases
  drop constraint before_after_cases_category_check;

alter table before_after_cases
  add constraint before_after_cases_category_check
  check (category in ('nose', 'gynecomastia', 'otoplasty', 'lip-repair', 'eyelid-lift', 'scar-revision'));
