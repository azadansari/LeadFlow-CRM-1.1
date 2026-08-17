"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { LeadService } from "@/services/lead.service";
import { LeadFormData } from "@/features/leads/types";

interface UpdateLeadPayload {
  id: string;
  data: LeadFormData;
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateLeadPayload) =>
      LeadService.update(id, data),

    onSuccess: () => {
      // Refresh Leads list
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      // Refresh Dashboard statistics
      queryClient.invalidateQueries({
        queryKey: ["lead-stats"],
      });

      // Refresh Lead Status Overview
      queryClient.invalidateQueries({
        queryKey: ["lead-status-overview"],
      });

      // Refresh Dashboard recent leads
      queryClient.invalidateQueries({
        queryKey: ["dashboard-recent-leads"],
      });
    },
  });
}