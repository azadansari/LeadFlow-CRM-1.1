import { Lead } from "@/types/lead";
import { LeadFormData } from "@/features/leads/types";
import { api } from "./api";

interface GetLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

interface GetLeadsResponse {
  data: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const LeadService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const response = await api.get("/leads", {
      params,
    });
    return response.data;
  },

  async getById(id: string): Promise<Lead> {
    const response = await api.get<Lead>(
      `/leads/${id}`
    );
    return response.data;
  },

  async getStats() {
    const response = await api.get<{
      totalLeads: number;
      todaysLeads: number;
      followUps: number;
      converted: number;
    }>("/leads/stats");

    return response.data;
  },
  async getStatusOverview(): Promise<
    { status: string; count: number }[]
  > {
    const response = await api.get<
      { status: string; count: number }[]
    >("/leads/status-overview");

    return response.data;
  },
  async create(
    data: LeadFormData
  ): Promise<Lead> {
    const response = await api.post<Lead>(
      "/leads",
      data
    );

    return response.data;
  },

  async update(
    id: string,
    data: LeadFormData
  ): Promise<Lead> {
    const response = await api.patch<Lead>(
      `/leads/${id}`,
      data
    );

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },
};