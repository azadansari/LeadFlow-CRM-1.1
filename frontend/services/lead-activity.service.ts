import { api } from "./api";

export interface LeadActivity {
  id: string;
  leadId: string;
  type: string;
  title: string;
  description?: string | null;
  createdAt: string;
}

export const LeadActivityService = {
  async getByLeadId(
    leadId: string
  ): Promise<LeadActivity[]> {
    const response = await api.get<LeadActivity[]>(
      `/lead-activities/${leadId}`
    );

    return response.data;
  },
  async create(data: {
    leadId: string;
    type: string;
    title: string;
    description?: string;
  }): Promise<LeadActivity> {
    const response = await api.post<LeadActivity>(
      "/lead-activities",
      data
    );

    return response.data;
  },

};
