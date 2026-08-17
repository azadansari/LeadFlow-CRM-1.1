"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadService } from "@/services/lead.service";

const statusConfig = [
  {
    status: "New",
    label: "New",
  },
  {
    status: "Contacted",
    label: "Contacted",
  },
  {
    status: "Qualified",
    label: "Qualified",
  },
  {
    status: "Converted",
    label: "Converted",
  },
  {
    status: "Lost",
    label: "Lost",
  },
];

export default function LeadStatusOverview() {
  const {
    data: statusOverview = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lead-status-overview"],
    queryFn: LeadService.getStatusOverview,
  });

  const getCount = (status: string) => {
    return (
      statusOverview.find(
        (item) => item.status === status
      )?.count ?? 0
    );
  };

  const total = statusOverview.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Status Overview</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="py-8 text-center text-gray-500">
            Loading status overview...
          </div>
        )}

        {isError && (
          <div className="py-8 text-center text-red-500">
            Failed to load status overview.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-5">
            {statusConfig.map((item) => {
              const count = getCount(item.status);

              const percentage =
                total > 0
                  ? Math.round((count / total) * 100)
                  : 0;

              return (
                <div key={item.status}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>

                    <span className="text-sm text-gray-500">
                      {count} ({percentage}%)
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}