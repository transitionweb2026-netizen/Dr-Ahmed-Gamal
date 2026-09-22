-- Drop the Arm Lift and Cleft Lip categories entirely, per the client's
-- request to remove both sections and their cards from the Before & After
-- page. Existing rows under those categories are cleared first so they
-- don't violate the narrowed constraint.
delete from before_after_cases where category in ('arm-lift', 'cleft-lip');

alter table before_after_cases
  drop constraint before_after_cases_category_check;

alter table before_after_cases
  add constraint before_after_cases_category_check
  check (category in ('nose', 'gynecomastia', 'otoplasty'));
