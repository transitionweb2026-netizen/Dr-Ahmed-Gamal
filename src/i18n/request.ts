import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getSupabasePublicClient } from "@/lib/supabase/public";

/**
 * Writes `value` into `root` at the dot-path `key` (e.g.
 * "legal.privacy.sections.2.heading"), creating objects/arrays along the way.
 * A pure-numeric path segment becomes an array index rather than an object
 * key, so this correctly rebuilds arrays like legal.*.sections[].
 */
function setDeep(root: Record<string, unknown>, key: string, value: string) {
  const parts = key.split(".");
  let node: Record<string, unknown> = root;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextIsIndex = /^\d+$/.test(parts[i + 1]);
    const prop: string | number = /^\d+$/.test(part) ? Number(part) : part;

    const current = (node as Record<string | number, unknown>)[prop];
    if (typeof current !== "object" || current === null) {
      (node as Record<string | number, unknown>)[prop] = nextIsIndex ? [] : {};
    }
    node = (node as Record<string | number, unknown>)[prop] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  const lastProp: string | number = /^\d+$/.test(lastPart) ? Number(lastPart) : lastPart;
  (node as Record<string | number, unknown>)[lastProp] = value;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const staticMessages = (await import(`../../messages/${locale}.json`)).default;

  // CMS-driven site text — every next-intl key is editable via /admin/translations.
  // Falls back to the bundled static JSON below whenever Supabase is
  // unconfigured/unreachable, or for any individual key it doesn't have yet,
  // so the site never renders a blank string.
  const supabase = getSupabasePublicClient();
  if (!supabase) {
    return { locale, messages: staticMessages };
  }

  const { data, error } = await supabase.from("translations").select("key, value").eq("locale", locale);
  if (error || !data || data.length === 0) {
    return { locale, messages: staticMessages };
  }

  const messages = structuredClone(staticMessages);
  for (const row of data) {
    setDeep(messages, row.key, row.value);
  }

  return { locale, messages };
});
