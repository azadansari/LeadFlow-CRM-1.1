"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { FollowUpService } from "@/services/follow-up.service";

interface DeleteFollowUpPayload {
  id: string;
  leadId: string;
}

export function useDeleteFollowUp() {
  const queryClient =
    useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
    }: DeleteFollowUpPayload) =>
      FollowUpService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "lead-follow-ups",
          variables.leadId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["follow-ups"],
      });

      queryClient.invalidateQueries({
        queryKey: ["lead-stats"],
      });
    },
  });
}