"use client";

import { useState } from "react";
import { CalendarClock, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCreateFollowUp } from "@/features/followups/hooks/useCreateFollowUp";

interface ScheduleFollowUpProps {
  leadId: string;
}

export default function ScheduleFollowUp({
  leadId,
}: ScheduleFollowUpProps) {
  const createFollowUp = useCreateFollowUp();

  const [type, setType] = useState("Call");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!date) {
      setError("Please select a follow-up date.");
      return;
    }

    if (!time) {
      setError("Please select a follow-up time.");
      return;
    }

    setError("");

    try {
      const dueAt = new Date(
        `${date}T${time}`
      ).toISOString();

      await createFollowUp.mutateAsync({
        leadId,
        type,
        dueAt,
        note: note.trim() || undefined,
      });

      setDate("");
      setTime("");
      setNote("");
      setType("Call");
    } catch (error) {
      console.error(
        "Failed to schedule follow-up:",
        error
      );

      setError(
        "Failed to schedule follow-up. Please try again."
      );
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <CalendarClock className="size-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Schedule Follow-up
          </h2>

          <p className="text-sm text-gray-500">
            Schedule the next follow-up for this lead.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Type
          </label>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
            disabled={createFollowUp.isPending}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Date
          </label>

          <input
            type="date"
            value={date}
            min={new Date()
              .toISOString()
              .split("T")[0]}
            onChange={(event) =>
              setDate(event.target.value)
            }
            disabled={createFollowUp.isPending}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(event) =>
              setTime(event.target.value)
            }
            disabled={createFollowUp.isPending}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Note */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">
          Note
        </label>

        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="What should be discussed?"
          rows={3}
          disabled={createFollowUp.isPending}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Button */}
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={createFollowUp.isPending}
        >
          <Plus className="mr-2 size-4" />

          {createFollowUp.isPending
            ? "Scheduling..."
            : "Schedule Follow-up"}
        </Button>
      </div>
    </div>
  );
}