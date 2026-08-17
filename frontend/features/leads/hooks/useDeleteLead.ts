"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { LeadService } from "@/services/lead.service";

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      LeadService.delete(id),

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