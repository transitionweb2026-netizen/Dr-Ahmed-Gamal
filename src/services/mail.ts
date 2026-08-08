import { getResendClient } from "@/lib/resend";
import { getContactInfo } from "@/services/contactInfo";
import type { ContactFormValues } from "@/types/forms";

interface SendResult {
  ok: boolean;
  reason?: "not_configured" | "send_failed";
}

// Resend's shared sandbox sender — swap for a verified sending domain
// (e.g. bookings@drahmedgamal.com) once the clinic's real domain is configured.
const FROM_ADDRESS = "Dr. Ahmed Gamal El-Borhamy Website <onboarding@resend.dev>";

export async function sendContactEmail(values: ContactFormValues): Promise<SendResult> {
  const resend = getResendClient();

  if (!resend) {
    console.error("[contact] RESEND_API_KEY is not set — dropping lead:", values);
    return { ok: false, reason: "not_configured" };
  }

  try {
    const contactInfo = await getContactInfo();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: contactInfo.email.display,
      subject: `New consultation request from ${values.fullName}`,
      text: [
        `Full name: ${values.fullName}`,
        `Phone: ${values.phone}`,
        `Age: ${values.age}`,
        `Procedure: ${values.procedure}`,
        `Preferred date: ${values.date}`,
        `Preferred time: ${values.time}`,
        `Message: ${values.message || "-"}`,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend send failed:", error);
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Resend send threw:", err);
    return { ok: false, reason: "send_failed" };
  }
}
