"use client";

import { useState } from "react";
import { useDeleteLead } from "@/features/leads/hooks/useDeleteLead";
import { Lead } from "@/types/lead";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteLeadDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteLeadDialog({
  lead,
  open,
  onOpenChange,
}: DeleteLeadDialogProps) {
  const deleteLead = useDeleteLead();
  const [serverError, setServerError] = useState("");

  const handleDelete = async () => {
    setServerError("");

    try {
      await deleteLead.mutateAsync(String(lead.id));

      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to delete lead:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to delete lead. Please try again.";

      setServerError(
        Array.isArray(message)
          ? message.join(", ")
          : message
      );
    }
  };

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);

    if (!value) {
      setServerError("");
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Lead?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{lead.name}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {serverError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteLead.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteLead.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteLead.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}