import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),

  status: z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Lost",
  ]),

  source: z.enum([
    "WhatsApp",
    "Website",
    "Facebook",
    "Instagram",
    "Referral",
    "Manual",
  ]),
});

export type LeadFormData = z.infer<typeof leadSchema>;