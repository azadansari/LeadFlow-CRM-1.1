"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";
export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      LeadService.delete(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}