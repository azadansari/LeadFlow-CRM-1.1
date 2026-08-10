import { Lead } from "@/types/lead";
import { LeadFormData } from "@/features/leads/types";
import { recentLeads } from "@/constants/leads";

let mockLeads: Lead[] = [...recentLeads];

export const LeadService = {
  async getAll(): Promise<Lead[]> {
    return Promise.resolve(mockLeads);
  },

  async create(data: LeadFormData): Promise<Lead> {
    const now = new Date().toISOString();

    const newLead: Lead = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      status: data.status,
      source: data.source,
      createdAt: now,
      updatedAt: now,
    };

    mockLeads = [newLead, ...mockLeads];

    return Promise.resolve(newLead);
  },
};