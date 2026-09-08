"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LeadActivityService } from "@/services/lead-activity.service";

interface CreateLeadActivityPayload {
  leadId: string;
  description: string;
}

export function useCreateLeadActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leadId,
      description,
    }: CreateLeadActivityPayload) =>
      LeadActivityService.create({
        leadId,
        type: "note",
        title: "Note Added",
        description,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "lead-activities",
          variables.leadId,
        ],
      });
    },
  });
}