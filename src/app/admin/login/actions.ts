"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface LoginResult {
  ok: false;
  error: string;
}

export async function loginAction(_prev: LoginResult | null, formData: FormData): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "CMS is not configured (Supabase env vars missing)." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return { ok: false, error: "Invalid email or password." };
  }

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", data.user.id).maybeSingle();
  if (!adminRow) {
    await supabase.auth.signOut();
    return { ok: false, error: "This account doesn't have CMS admin access." };
  }

  redirect("/admin");
}
