"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadHeader from "@/components/leads/LeadHeader";
import LeadTable from "@/components/leads/LeadTable";
import LeadTopToolBar from "@/components/leads/LeadTopToolBar";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { Import } from "lucide-react";

export default function LeadsPage() {
  const {
    leads,
    search,
    setSearch,
    status,
    setStatus,
    isLoading,
    isError,
    refetch,
  } = useLeads();

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 bgwhite-container">
        <LeadHeader />

        <LeadTopToolBar 
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        {isLoading && (
          <div className="rounded-lg border p-8 text-center text-gray-500">
            Loading leads...
          </div>
        )}

        {isError && (
          <div className="rounded-lg border p-8 text-center">
            <p className="text-red-500">
              Failed to load leads.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-3 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {leads.length === 0 ? (
              <div className="rounded-lg border p-8 text-center text-gray-500">
                No leads found.
              </div>
            ) : (
              <LeadTable leads={leads} />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}