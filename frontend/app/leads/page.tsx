"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadHeader from "@/components/leads/LeadHeader";
import LeadTable from "@/components/leads/LeadTable";
import LeadTopToolBar from "@/components/leads/LeadTopToolBar";
import { recentLeads } from "@/constants/leads";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { Import } from "lucide-react";

export default function LeadsPage() {
  const {
    leads,
    search,
    setSearch,
    status,
    setStatus,
  } = useLeads();

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <LeadHeader />
        <LeadTopToolBar 
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <LeadTable leads={recentLeads} />
      </div>
    </DashboardLayout>
  );
}