"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadHeader from "@/components/leads/LeadHeader";
import LeadTable from "@/components/leads/LeadTable";
import LeadTopToolBar from "@/components/leads/LeadTopToolBar";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { Button } from "@/components/ui/button";

export default function LeadsPage() {
  const {
    leads,
    search,
    setSearch,
    status,
    setStatus,
    page,
    pagination,
    sortBy,
    sortOrder,
    handleSort,
    isLoading,
    isError,
    refetch,
    goToNextPage,
    goToPreviousPage,
  } = useLeads();

  return (
    <DashboardLayout>
      <div className="space-y-6 bgwhite-container p-4">
        <LeadHeader />

        {/* Search + Status Filter */}
        <LeadTopToolBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {/* Loading */}
        {isLoading && (
          <div className="rounded-lg border p-8 text-center text-gray-500">
            Loading leads...
          </div>
        )}

        {/* Error */}
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

        {/* Leads */}
        {!isLoading && !isError && (
          <>
            {leads.length === 0 ? (
              <div className="rounded-lg border p-8 text-center text-gray-500">
                No leads found.
              </div>
            ) : (
              <>
                <LeadTable
                  leads={leads}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                      Showing{" "}
                      {(page - 1) * pagination.limit + 1}
                      {" "}to{" "}
                      {Math.min(
                        page * pagination.limit,
                        pagination.total
                      )}
                      {" "}of{" "}
                      {pagination.total} leads
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={page === 1}
                      >Previous
                      </Button>

                      <span className="px-3 text-sm">
                        Page {page} of {pagination.totalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={page === pagination.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}