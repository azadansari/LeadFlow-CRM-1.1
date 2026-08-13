"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}