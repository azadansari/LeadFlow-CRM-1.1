"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateLead } from "@/features/leads/hooks/useCreateLead";

import {
  leadSchema,
  LeadFormData,
} from "@/features/leads/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { size } from "zod/v4/mini";

interface LeadFormProps {
  onSuccess?: () => void;
  showCancel?: boolean;
}

export default function LeadForm({
  onSuccess,
  showCancel = true,
}: LeadFormProps) {
  const router = useRouter();
  const createLead = useCreateLead();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      status: "New",
      source: "Manual",
    },
  });

  const status = watch("status");
  const source = watch("source");

  const onSubmit = async (data: LeadFormData) => {
    setServerError("");

    try {
      await createLead.mutateAsync(data);

      reset();

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/leads");
      }
    } catch (error: any) {
      console.error("Failed to create lead:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to create lead. Please try again.";

      setServerError(
        Array.isArray(message)
          ? message.join(", ")
          : message
      );
    }
  };

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/leads");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-xl border bg-white shadow-sm">
        {/* Form Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">
            Lead Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the details below to create a new lead.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6"
        >
          {/* Server Error */}
          {serverError && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>

              <Input
                placeholder="Enter lead name"
                {...register("name")}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500 txt-12">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </label>

              <Input
                placeholder="Enter phone number"
                {...register("phone")}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 txt-12">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <Select
                value={status}
                onValueChange={(value) => {
                  if (value) {
                    setValue(
                      "status",
                      value as LeadFormData["status"]
                    );
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="New">
                    New
                  </SelectItem>

                  <SelectItem value="Contacted">
                    Contacted
                  </SelectItem>

                  <SelectItem value="Qualified">
                    Qualified
                  </SelectItem>

                  <SelectItem value="Converted">
                    Converted
                  </SelectItem>

                  <SelectItem value="Lost">
                    Lost
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Source
              </label>

              <Select
                value={source}
                onValueChange={(value) => {
                  if (value) {
                    setValue(
                      "source",
                      value as LeadFormData["source"]
                    );
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select source" />
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
          </div>

          {/* Divider */}
          <div className="my-8 border-t" />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {showCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              disabled={createLead.isPending}
            >
              {createLead.isPending
                ? "Creating..."
                : "Create Lead"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}