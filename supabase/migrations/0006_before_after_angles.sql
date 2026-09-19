-- before_after_cases.angles — up to 4 additional angle views shown in a
-- popup when a card is clicked, on top of the card's own before/after
-- preview. Each entry is { image, afterImage? }: Nose cases fill in
-- afterImage for every angle (so each angle gets its own before/after
-- slider); every other category only sets `image` (a single static photo
-- per angle, no slider) — enforced in the admin form, not the schema,
-- since it's a per-category UI choice rather than a data constraint.
alter table before_after_cases
  add column angles jsonb not null default '[]'::jsonb;
