"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";
import { LeadFormData } from "@/features/leads/types";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LeadFormData) =>
      LeadService.create(data),

    onSuccess: (createdLead) => {
      // Leads list
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      // Dashboard recent leads
      queryClient.invalidateQueries({
        queryKey: ["dashboard-recent-leads"],
      });
      // Refresh Lead Status Overview
      queryClient.invalidateQueries({
        queryKey: ["lead-status-overview"],
      });

      // Dashboard stats
      queryClient.invalidateQueries({
        queryKey: ["lead-stats"],
      });

      // New lead activity
      queryClient.invalidateQueries({
        queryKey: [
          "lead-activities",
          createdLead.id,
        ],
      });
    },
  });
}