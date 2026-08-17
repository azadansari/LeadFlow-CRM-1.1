"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Lead } from "@/types/lead";
import EditLeadDialog from "./EditLeadDialog";
import DeleteLeadDialog from "./DeleteLeadDialog";

interface LeadDetailsActionsProps {
  lead: Lead;
}

export default function LeadDetailsActions({
  lead,
}: LeadDetailsActionsProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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

      <DeleteLeadDialog
        lead={lead}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            router.refresh();
          }
        }}
      />
    </>
  );
}