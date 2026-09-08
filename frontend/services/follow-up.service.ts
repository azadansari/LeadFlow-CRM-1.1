import { api } from "./api";

export interface FollowUp {
  id: string;
  leadId: string;
  type: string;
  dueAt: string;
  note?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;

  lead?: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
  };
}

export interface CreateFollowUpData {
  leadId: string;
  type: string;
  dueAt: string;
  note?: string;
}

export const FollowUpService = {
  async getAll(): Promise<FollowUp[]> {
    const response = await api.get<FollowUp[]>(
      "/follow-ups"
    );

    return response.data;
  },

  async getByLeadId(
    leadId: string
  ): Promise<FollowUp[]> {
    const response = await api.get<FollowUp[]>(
      `/follow-ups/lead/${leadId}`
    );

    return response.data;
  },

  async create(
    data: CreateFollowUpData
  ): Promise<FollowUp> {
    const response = await api.post<FollowUp>(
      "/follow-ups",
      data
    );

    return response.data;
  },

  async updateStatus(
    id: string,
    status: string
  ): Promise<FollowUp> {
    const response = await api.patch<FollowUp>(
      `/follow-ups/${id}/status`,
      { status }
    );

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/follow-ups/${id}`);
  },
};