import { Lead } from "@/types/lead";
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
}

export default function LeadTable({ leads }: LeadTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.phone}</TableCell>
            <TableCell>{lead.email ?? "-"}</TableCell>
            <TableCell>{lead.status}</TableCell>
            <TableCell>{lead.source}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}