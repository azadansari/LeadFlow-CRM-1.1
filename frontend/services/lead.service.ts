import { Lead } from "@/types/lead";
import { recentLeads } from "@/constants/leads";

export const LeadService = {
  async getAll(): Promise<Lead[]> {
    // Future:
    // const response = await api.get("/leads");
    // return response.data;

    return Promise.resolve(recentLeads);
  },
};