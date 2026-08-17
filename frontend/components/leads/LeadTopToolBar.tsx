"use client";
import LeadSearch from "./LeadSearch";
import LeadStatusFilter from "./LeadStatusFilter";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}
export default function LeadTopToolBar({
  search,
  onSearchChange,
  status,
  onStatusChange,}:Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 md:flex-row">
        <LeadSearch
          value={search}
          onChange={onSearchChange}
        />
        <LeadStatusFilter
          value={status}
          onChange={(value) => onStatusChange(value ?? "all")}
        />
      </div>
    </div>
  );
}