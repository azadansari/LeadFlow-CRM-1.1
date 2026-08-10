export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Lost";

export type LeadSource =
  | "WhatsApp"
  | "Website"
  | "Facebook"
  | "Instagram"
  | "Referral"
  | "Manual";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;

  status: LeadStatus;
  source: LeadSource;

  assignedTo?: string;

  createdAt: string;
  updatedAt: string;
}