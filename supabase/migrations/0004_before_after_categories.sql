-- Replace before_after_cases' 3 generic categories (face/body/breast) with 5
-- specific procedure categories, per the client's request to reorganize the
-- Before & After page around named procedures instead of broad regions.
-- Existing rows under the old categories are cleared — the page is fully
-- reseeded with 3 new cases per category (see scripts/seed-before-after-cases.ts).

delete from before_after_cases;

alter table before_after_cases
  drop constraint before_after_cases_category_check;

alter table before_after_cases
  add constraint before_after_cases_category_check
  check (category in ('nose', 'gynecomastia', 'arm-lift', 'cleft-lip', 'otoplasty'));
