"use client";

import { CalendarClock, CheckCircle2, Clock, Trash2,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadFollowUps } from "@/features/followups/hooks/useLeadFollowUps";
import { useUpdateFollowUpStatus } from "@/features/followups/hooks/useUpdateFollowUpStatus";
import { useDeleteFollowUp } from "@/features/followups/hooks/useDeleteFollowUp";

interface LeadFollowUpsProps {
  leadId: string;
}

export default function LeadFollowUps({
  leadId,
}: LeadFollowUpsProps) {
  const {
    data: followUps = [],
    isLoading,
    isError,
  } = useLeadFollowUps(leadId);

  const updateStatus =
    useUpdateFollowUpStatus();

  const deleteFollowUp =
    useDeleteFollowUp();

  const handleComplete = async (
    id: string
  ) => {
    try {
      await updateStatus.mutateAsync({
        id,
        leadId,
        status: "Completed",
      });
    } catch (error) {
      console.error(
        "Failed to complete follow-up:",
        error
      );
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    try {
      await deleteFollowUp.mutateAsync({
        id,
        leadId,
      });
    } catch (error) {
      console.error(
        "Failed to delete follow-up:",
        error
      );
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <CalendarClock className="size-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Follow-ups
          </h2>

          <p className="text-sm text-gray-500">
            Scheduled follow-ups for this lead.
          </p>
        </div>
      </div>

      <div className="mt-6">
        {isLoading && (
          <p className="text-sm text-gray-500">
            Loading follow-ups...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load follow-ups.
          </p>
        )}

        {!isLoading &&
          !isError &&
          followUps.length === 0 && (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <CalendarClock className="mx-auto size-8 text-gray-400" />

              <p className="mt-2 text-sm font-medium">
                No follow-ups scheduled
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Schedule a follow-up using the form above.
              </p>
            </div>
          )}

        {!isLoading &&
          !isError &&
          followUps.length > 0 && (
            <div className="space-y-4">
              {followUps.map((followUp) => {
                const isCompleted =
                  followUp.status === "Completed";

                return (
                  <div
                    key={followUp.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex gap-3">
                        <div
                          className={`mt-1 rounded-full p-2 ${
                            isCompleted
                              ? "bg-green-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="size-4 text-green-600" />
                          ) : (
                            <Clock className="size-4 text-blue-600" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {followUp.type}
                            </p>

                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {followUp.status}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-500">
                            {new Date(
                              followUp.dueAt
                            ).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>

                          {followUp.note && (
                            <p className="mt-2 text-sm text-gray-700">
                              {followUp.note}
                            </p>
                          )}
                        </div>
                      </div>

                      {!isCompleted && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={
                              updateStatus.isPending
                            }
                            onClick={() =>
                              handleComplete(
                                followUp.id
                              )
                            }
                          >
                            <CheckCircle2 className="mr-1 size-4" />
                            Complete
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={
                              deleteFollowUp.isPending
                            }
                            onClick={() =>
                              handleDelete(
                                followUp.id
                              )
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      )}
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