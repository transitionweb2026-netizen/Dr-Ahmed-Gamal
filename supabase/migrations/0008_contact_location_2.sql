-- contact_info.location_2_* — a second "Clinic Destination" map card on the
-- Contact page (a duplicate of the existing address/maps_url pair), mirroring
-- that pair exactly so the admin form and LocationBlock component can reuse
-- the same shape for both cards.
alter table contact_info
  add column location_2_address jsonb,
  add column location_2_maps_url text;
