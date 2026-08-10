"use client";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lead } from "@/types/lead";

interface LeadActionsProps {
  lead: Lead;
}

export default function LeadActions({
  lead,
}: LeadActionsProps) {
  const handleView = () => {
    console.log("View Lead:", lead);
  };

  const handleEdit = () => {
    console.log("Edit Lead:", lead);
  };

  const handleDelete = () => {
    console.log("Delete Lead:", lead);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Lead actions"
          >
            <MoreHorizontal />
          </Button>
        }
      />

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
  );
}