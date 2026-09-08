"use client";
import LeadActivityTimeline from "./LeadActivityTimeline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddLeadNote from "./AddLeadNote";
import ScheduleFollowUp from "./ScheduleFollowUp";
import LeadFollowUps from "./LeadFollowUps";
import { ArrowLeft, Pencil, Trash2, Phone, Mail, Globe, Calendar, Clock,} from "lucide-react";

import { Lead } from "@/types/lead";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LeadStatusBadge from "./LeadStatusBadge";
import EditLeadDialog from "./EditLeadDialog";
import DeleteLeadDialog from "./DeleteLeadDialog";

interface LeadDetailsProps {
  lead: Lead;
}

export default function LeadDetails({
  lead,
}: LeadDetailsProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="min-h-full space-y-6 bg-gray-50 p-6">

        {/* Back */}
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => router.push("/leads")}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Leads
        </Button>

        {/* Header */}
        <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {lead.name}
              </h1>

              <LeadStatusBadge status={lead.status} />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Lead details and information
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Lead Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Lead Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">

                {/* Name */}
                <div className="flex gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Globe className="size-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Name
                    </p>

                    <p className="mt-1 font-medium">
                      {lead.name}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="rounded-lg bg-green-50 p-2">
                    <Phone className="size-5 text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 font-medium">
                      {lead.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <div className="rounded-lg bg-purple-50 p-2">
                    <Mail className="size-5 text-purple-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-medium">
                      {lead.email || "-"}
                    </p>
                  </div>
                </div>

                {/* Source */}
                <div className="flex gap-3">
                  <div className="rounded-lg bg-orange-50 p-2">
                    <Globe className="size-5 text-orange-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Source
                    </p>
                    <p className="mt-1 font-medium">
                      {lead.source}
                    </p>
                  </div>
                </div>
                {/* Status */}
                <div className="flex gap-3">
                  <div className="rounded-lg bg-yellow-50 p-2">
                    <Clock className="size-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>
                    <div className="mt-1">
                      <LeadStatusBadge
                        status={lead.status}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Timeline / Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>
                Lead Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Created */}
                <div className="flex gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-2">
                    <Calendar className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Lead Created
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleString(
                      "en-IN",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                    </p>
                  </div>
                </div>
                {/* Updated */}
                <div className="flex gap-3">
                  <div className="mt-1 rounded-full bg-gray-100 p-2">
                    <Clock className="size-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Last Updated
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(lead.updatedAt).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                    </p>
                  </div>
                </div>
                {/* Current Status */}
                <div className="border-t pt-5">
                  <p className="text-sm text-gray-500">
                    Current Status
                  </p>
                  <div className="mt-2">
                    <LeadStatusBadge
                      status={lead.status}
                    />
                  </div>
                </div>
                {/* Source */}
                <div>
                  <p className="text-sm text-gray-500">
                    Lead Source
                  </p>
                  <p className="mt-1 font-medium">
                    {lead.source}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
          <LeadActivityTimeline leadId={lead.id} />
          <AddLeadNote leadId={lead.id} />
          <ScheduleFollowUp leadId={lead.id} />
          <LeadFollowUps leadId={lead.id} />
        </div>
      </div>
      {/* Edit Dialog */}
      <EditLeadDialog
        lead={lead}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);

          if (!open) {
            router.refresh();
          }
        }}
      />
      {/* Delete Dialog */}
      <DeleteLeadDialog
        lead={lead}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) {
            router.push("/leads");
          }
        }}
      />
    </>
  );
}