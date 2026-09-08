"use client";

import { useQuery } from "@tanstack/react-query";

import { FollowUpService } from "@/services/follow-up.service";

export function useLeadFollowUps(
  leadId: string
) {
  return useQuery({
    queryKey: [
      "lead-follow-ups",
      leadId,
    ],
    queryFn: () =>
      FollowUpService.getByLeadId(leadId),

    enabled: Boolean(leadId),
  });
}