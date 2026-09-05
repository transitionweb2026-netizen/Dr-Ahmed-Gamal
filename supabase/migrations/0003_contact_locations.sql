-- contact_info.locations — the clinic has multiple physical branches, each
-- with its own address and phone number. Previously `contact_info` only had
-- one singular `address`/`phone_*` pair, so all branches were crammed into
-- one bilingual text block with a single shared phone number. `locations` is
-- an ordered array of { address: {en,ar}, phone_display, phone_href },
-- edited as a repeatable list in the admin (same pattern as `working_hours`)
-- and rendered as one address+phone group per branch in the footer, instead
-- of a single merged block.

alter table contact_info
  add column locations jsonb not null default '[]'::jsonb;
