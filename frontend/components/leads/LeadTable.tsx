"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

import { Lead } from "@/types/lead";
import LeadStatusBadge from "./LeadStatusBadge";
import LeadActions from "./LeadActions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadTableProps {
  leads: Lead[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export default function LeadTable({
  leads,
  sortBy,
  sortOrder,
  onSort,
}: LeadTableProps) {
  const renderSortIcon = (field: string) => {
    if (sortBy !== field) {
      return null;
    }

    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1 size-4" />
    ) : (
      <ArrowDown className="ml-1 size-4" />
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              type="button"
              onClick={() => onSort("name")}
              className="inline-flex items-center font-medium hover:underline"
            >
              Name
              {renderSortIcon("name")}
            </button>
          </TableHead>

          <TableHead>Phone</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Source</TableHead>

          <TableHead>
            <button
              type="button"
              onClick={() => onSort("createdAt")}
              className="inline-flex items-center font-medium hover:underline"
            >
              Created At
              {renderSortIcon("createdAt")}
            </button>
          </TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>
              {lead.name}
            </TableCell>

            <TableCell>
              {lead.phone}
            </TableCell>

            <TableCell>
              {lead.email ?? "-"}
            </TableCell>

            <TableCell>
              <LeadStatusBadge
                status={lead.status}
              />
            </TableCell>

            <TableCell>
              {lead.source}
            </TableCell>

            <TableCell>
              {new Date(
                lead.createdAt
              ).toLocaleDateString()}
            </TableCell>

            <TableCell>
              <LeadActions lead={lead} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}