import { Resend } from "resend";

let client: Resend | null | undefined;

/** Lazily instantiates the Resend client only if RESEND_API_KEY is set. */
export function getResendClient(): Resend | null {
  if (client !== undefined) return client;
  const apiKey = process.env.RESEND_API_KEY;
  client = apiKey ? new Resend(apiKey) : null;
  return client;
}
