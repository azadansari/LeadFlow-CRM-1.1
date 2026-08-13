"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteLeadDialog from "./DeleteLeadDialog";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lead } from "@/types/lead";
import EditLeadDialog from "./EditLeadDialog";

interface LeadActionsProps {
  lead: Lead;
}

export default function LeadActions({
  lead,
}: LeadActionsProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleView = () => {
    router.push(`/leads/${lead.id}`);
  };
  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Lead actions"
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>
            <Eye />
            View Lead
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleEdit}>
            <Pencil />
            Edit Lead
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600"
          >
            <Trash2 />
            Delete Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLeadDialog
        lead={lead}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteLeadDialog
        lead={lead}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}