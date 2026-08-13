"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Lead } from "@/types/lead";
import {
  leadSchema,
  LeadFormData,
} from "@/features/leads/types";

import { useUpdateLead } from "@/features/leads/hooks/useUpdateLead";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditLeadDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditLeadDialog({
  lead,
  open,
  onOpenChange,
}: EditLeadDialogProps) {
  const updateLead = useUpdateLead();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || "",
        status: lead.status,
        source: lead.source,
      });
    }
  }, [open, lead, reset]);

  const status = watch("status");
  const source = watch("source");

  const onSubmit = async (data: LeadFormData) => {
    setServerError("");
    try {
      await updateLead.mutateAsync({
        id: String(lead.id),
        data,
      });
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to update lead:", error);
      const message =
        error?.response?.data?.message ||
        "Failed to update lead. Please try again.";
      setServerError(
        Array.isArray(message) ? message.join(", ") : message
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      onOpenChange(value);
      if (!value) {
        setServerError("");
      }
    }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {serverError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {serverError}
            </div>
          )}

          {/* Name */}
          ...
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name *
            </label>

            <Input {...register("name")} />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone *
            </label>

            <Input {...register("phone")} />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <Select
              value={status}
              onValueChange={(value) =>
                setValue(
                  "status",
                  value as LeadFormData["status"]
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">
                  Contacted
                </SelectItem>
                <SelectItem value="Qualified">
                  Qualified
                </SelectItem>
                <SelectItem value="Converted">
                  Converted
                </SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Source
            </label>

            <Select
              value={source}
              onValueChange={(value) =>
                setValue(
                  "source",
                  value as LeadFormData["source"]
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="WhatsApp">
                  WhatsApp
                </SelectItem>

                <SelectItem value="Website">
                  Website
                </SelectItem>

                <SelectItem value="Facebook">
                  Facebook
                </SelectItem>

                <SelectItem value="Instagram">
                  Instagram
                </SelectItem>

                <SelectItem value="Referral">
                  Referral
                </SelectItem>

                <SelectItem value="Manual">
                  Manual
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateLead.isPending}
            >
              {updateLead.isPending
                ? "Updating..."
                : "Update Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}