-- videos.video_url — lets the admin upload an actual video file (to the
-- existing "media" storage bucket) instead of only linking a YouTube/Vimeo
-- ID. VideoModal prefers this when present, falling back to the YouTube/
-- Vimeo embed, then to the "coming soon" placeholder.
alter table videos
  add column video_url text;

-- Raise the "media" bucket's per-file limit so video uploads aren't capped
-- at whatever small default applies to image uploads. Still bounded by the
-- project's global Storage upload limit (Dashboard > Storage > Settings) —
-- if that's lower, it wins over this bucket-level value.
update storage.buckets
set file_size_limit = 314572800 -- 300 MB
where id = 'media';
