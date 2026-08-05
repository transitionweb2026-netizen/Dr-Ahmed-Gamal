"use server";

import { contactFormSchema, type ContactFormValues } from "@/types/forms";
import { sendContactEmail } from "@/services/mail";

interface ActionResult {
  ok: boolean;
  reason?: string;
}

export async function submitContactAction(values: ContactFormValues): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false, reason: "invalid" };
  }

  return sendContactEmail(parsed.data);
}
