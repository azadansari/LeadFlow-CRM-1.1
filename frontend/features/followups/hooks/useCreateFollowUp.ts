"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  FollowUpService,
  CreateFollowUpData,
} from "@/services/follow-up.service";

export function useCreateFollowUp() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateFollowUpData
    ) => FollowUpService.create(data),

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