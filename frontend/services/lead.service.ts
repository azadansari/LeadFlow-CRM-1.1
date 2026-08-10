import { recentLeads } from "@/constants/leads";
import { Lead } from "@/types/lead";

export const LeadService = {
  async getAll(): Promise<Lead[]> {
    return Promise.resolve(recentLeads);
  },
};