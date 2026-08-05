import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  age: z.coerce.number().int().min(1).max(120),
  procedure: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  message: z.string().trim().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
