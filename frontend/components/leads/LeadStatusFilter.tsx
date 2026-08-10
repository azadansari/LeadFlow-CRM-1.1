"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Props {
  value: string;
  onChange: (value: string | null) => void;
}
export default function LeadStatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="New">New</SelectItem>
        <SelectItem value="Contacted">Contacted</SelectItem>
        <SelectItem value="Qualified">Qualified</SelectItem>
        <SelectItem value="Converted">Converted</SelectItem>
        <SelectItem value="Lost">Lost</SelectItem>
      </SelectContent>
    </Select>
  );
}