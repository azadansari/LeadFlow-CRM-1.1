"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { FollowUpService } from "@/services/follow-up.service";

interface UpdateFollowUpStatusPayload {
  id: string;
  leadId: string;
  status: string;
}

export function useUpdateFollowUpStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: UpdateFollowUpStatusPayload) =>
      FollowUpService.updateStatus(
        id,
        status
      ),

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