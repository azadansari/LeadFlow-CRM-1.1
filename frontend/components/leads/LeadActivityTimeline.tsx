"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CheckCircle2,
  Pencil,
  UserPlus,
} from "lucide-react";

import { LeadActivityService } from "@/services/lead-activity.service";

interface LeadActivityTimelineProps {
  leadId: string;
}

function getActivityIcon(type: string) {
  switch (type) {
    case "created":
      return UserPlus;

    case "status_changed":
      return CheckCircle2;

    case "updated":
      return Pencil;

    default:
      return Activity;
  }
}

export default function LeadActivityTimeline({
  leadId,
}: LeadActivityTimelineProps) {
  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lead-activities", leadId],
    queryFn: () =>
      LeadActivityService.getByLeadId(leadId),
  });

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="text-lg font-semibold">
        Activity
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Recent activity for this lead
      </p>

      <div className="mt-6">
        {isLoading && (
          <p className="text-sm text-gray-500">
            Loading activity...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load activity.
          </p>
        )}

        {!isLoading &&
          !isError &&
          activities.length === 0 && (
            <p className="text-sm text-gray-500">
              No activity yet.
            </p>
          )}

        {!isLoading &&
          !isError &&
          activities.length > 0 && (
            <div className="space-y-6">
              {activities.map((activity) => {
                const Icon = getActivityIcon(
                  activity.type
                );

                return (
                  <div
                    key={activity.id}
                    className="flex gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">
                        {activity.title}
                      </p>

                      {activity.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {activity.description}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}