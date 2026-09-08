"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      LeadService.delete(id),

    onSuccess: (_, deletedLeadId) => {
      // Leads list
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      // Dashboard recent leads
      queryClient.invalidateQueries({
        queryKey: ["dashboard-recent-leads"],
      });

      // Dashboard stats
      queryClient.invalidateQueries({
        queryKey: ["lead-stats"],
      });
      // Refresh Lead Status Overview
      queryClient.invalidateQueries({
        queryKey: ["lead-status-overview"],
      });

      // Remove activity cache for deleted lead
      queryClient.removeQueries({
        queryKey: [
          "lead-activities",
          deletedLeadId,
        ],
      });
    },
  });
}