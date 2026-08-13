import { Lead } from "@/types/lead";
import { LeadFormData } from "@/features/leads/types";
import { api } from "./api";

export const LeadService = {
  async getAll(): Promise<Lead[]> {
    const response = await api.get<Lead[]>("/leads");
    return response.data;
  },
  async create(data: LeadFormData): Promise<Lead> {
    const response = await api.post<Lead>("/leads", data);
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