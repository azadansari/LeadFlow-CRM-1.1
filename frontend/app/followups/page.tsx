"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";

import {
  FollowUp,
  FollowUpService,
} from "@/services/follow-up.service";

import { useUpdateFollowUpStatus } from "@/features/followups/hooks/useUpdateFollowUpStatus";
import { useDeleteFollowUp } from "@/features/followups/hooks/useDeleteFollowUp";

type Filter = "all" | "Pending" | "Completed";

export default function FollowupsPage() {
  const [filter, setFilter] =
    useState<Filter>("all");

  const {
    data: followUps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["follow-ups"],
    queryFn: FollowUpService.getAll,
  });

  const updateStatus =
    useUpdateFollowUpStatus();

  const deleteFollowUp =
    useDeleteFollowUp();

  const filteredFollowUps = useMemo(() => {
    if (filter === "all") {
      return followUps;
    }

    return followUps.filter(
      (followUp) =>
        followUp.status === filter
    );
  }, [followUps, filter]);

  const handleComplete = async (
    followUp: FollowUp
  ) => {
    try {
      await updateStatus.mutateAsync({
        id: followUp.id,
        leadId: followUp.leadId,
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
    followUp: FollowUp
  ) => {
    try {
      await deleteFollowUp.mutateAsync({
        id: followUp.id,
        leadId: followUp.leadId,
      });
    } catch (error) {
      console.error(
        "Failed to delete follow-up:",
        error
      );
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Follow-ups
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your scheduled lead follow-ups.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={
            filter === "all"
              ? "default"
              : "outline"
          }
          onClick={() => setFilter("all")}
        >
          All
        </Button>

        <Button
          variant={
            filter === "Pending"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setFilter("Pending")
          }
        >
          Pending
        </Button>

        <Button
          variant={
            filter === "Completed"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setFilter("Completed")
          }
        >
          Completed
        </Button>
      </div>

      {/* Follow-ups */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filter === "all"
              ? "All Follow-ups"
              : `${filter} Follow-ups`}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading follow-ups...
            </div>
          )}

          {isError && (
            <div className="py-10 text-center text-sm text-red-500">
              Failed to load follow-ups.
            </div>
          )}

          {!isLoading &&
            !isError &&
            filteredFollowUps.length === 0 && (
              <div className="rounded-lg border border-dashed p-10 text-center">
                <CalendarClock className="mx-auto size-10 text-gray-400" />

                <p className="mt-3 font-medium">
                  No follow-ups found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Scheduled follow-ups will appear here.
                </p>
              </div>
            )}

          {!isLoading &&
            !isError &&
            filteredFollowUps.length > 0 && (
              <div className="space-y-4">
                {filteredFollowUps.map(
                  (followUp) => {
                    const isCompleted =
                      followUp.status ===
                      "Completed";

                    return (
                      <div
                        key={followUp.id}
                        className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          {/* Info */}
                          <div className="flex gap-4">
                            <div
                              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                                isCompleted
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="size-5 text-green-600" />
                              ) : (
                                <Clock className="size-5 text-blue-600" />
                              )}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold">
                                  {followUp.type}
                                </h3>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    isCompleted
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {followUp.status}
                                </span>
                              </div>

                              {"lead" in followUp && followUp.lead && (
                                <p className="mt-1 text-sm font-medium">
                                    { followUp.lead.name}
                                  </p>
                                )}

                              <p className="mt-1 text-sm text-gray-500">
                                {new Date(
                                  followUp.dueAt
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle:
                                      "medium",
                                    timeStyle:
                                      "short",
                                  }
                                )}
                              </p>

                              {followUp.note && (
                                <p className="mt-2 text-sm text-gray-700">
                                  {followUp.note}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
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
                                    followUp
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
                                    followUp
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
                  }
                )}
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}