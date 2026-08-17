"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { LeadService } from "@/services/lead.service";
import { LeadFormData } from "@/features/leads/types";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LeadFormData) =>
      LeadService.create(data),

    onSuccess: () => {
      // Refresh Leads list
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      // Refresh Lead Status Overview
      queryClient.invalidateQueries({
        queryKey: ["lead-status-overview"],
      });

      // Refresh Dashboard statistics
      queryClient.invalidateQueries({
        queryKey: ["lead-stats"],
      });

      // Refresh Dashboard recent leads
      queryClient.invalidateQueries({
        queryKey: ["dashboard-recent-leads"],
      });
    },
  });
}