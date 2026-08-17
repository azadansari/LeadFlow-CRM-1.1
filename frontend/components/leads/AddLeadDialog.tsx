"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateLead } from "@/features/leads/hooks/useCreateLead";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { leadSchema, LeadFormData,} from "@/features/leads/types";
export default function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const createLead = useCreateLead();
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
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to create lead:", error);
      const message =
        error?.response?.data?.message ||
        "Failed to create lead. Please try again.";
      setServerError(
        Array.isArray(message) ? message.join(", ") : message
      );
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setServerError("");
        }
      }}
    >
      {/* Add Lead Button */}
      <DialogTrigger render={<Button className="default-btn">Add Lead</Button>} />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
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
              placeholder="Enter email"
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
              <SelectTrigger>
                <SelectValue />
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
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >Cancel
            </Button>
            <Button className="default-btn"
              type="submit"
              disabled={createLead.isPending}
            >
              {createLead.isPending ? "Creating..." : "Create Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}