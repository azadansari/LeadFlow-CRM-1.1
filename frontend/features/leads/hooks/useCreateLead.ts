"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";
import { LeadFormData } from "@/features/leads/types";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LeadFormData) =>
      LeadService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}