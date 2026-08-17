"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

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

    const handleDeleteSuccess = () => {
        router.push("/leads");
    };

    return (
        <>
            <div className="space-y-6 p-6">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => router.push("/leads")}
                >
                    <ArrowLeft />
                    Back to Leads
                </Button>

                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {lead.name}
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Lead Details
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <LeadStatusBadge status={lead.status} />

                        <Button
                            variant="outline"
                            onClick={() => setEditOpen(true)}
                        >
                            <Pencil />
                            Edit
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={() => setDeleteOpen(true)}
                        >
                            <Trash2 />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Lead Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Lead Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Name */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="mt-1 font-medium">
                                    {lead.name}
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p className="mt-1 font-medium">
                                    {lead.phone}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="mt-1 font-medium">
                                    {lead.email || "-"}
                                </p>
                            </div>

                            {/* Source */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Source
                                </p>

                                <p className="mt-1 font-medium">
                                    {lead.source}
                                </p>
                            </div>

                            {/* Status */}
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

                            {/* Created At */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Created At
                                </p>

                                <p className="mt-1 font-medium">
                                    {new Date(
                                        lead.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>

                            {/* Updated At */}
                            <div>
                                <p className="text-sm text-gray-500">
                                    Last Updated
                                </p>

                                <p className="mt-1 font-medium">
                                    {new Date(
                                        lead.updatedAt
                                    ).toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </CardContent>
                </Card>
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