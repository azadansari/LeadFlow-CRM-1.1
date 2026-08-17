"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { LeadService } from "@/services/lead.service";
import { Lead } from "@/types/lead";
import LeadStatusBadge from "@/components/leads/LeadStatusBadge";

export default function RecentLeadsTable() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-recent-leads"],
    queryFn: () =>
      LeadService.getAll({
        page: 1,
        limit: 5,
      }),
  });

  const recentLeads = data?.data ?? [];

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Leads</CardTitle>

        <Button className="default-btn"
          variant="ghost"
          size="sm"
          onClick={() => router.push("/leads")}
        >
          View All
          <ArrowRight />
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="py-8 text-center text-gray-500">
            Loading recent leads...
          </div>
        )}

        {isError && (
          <div className="py-8 text-center text-red-500">
            Failed to load recent leads.
          </div>
        )}

        {!isLoading &&
          !isError &&
          recentLeads.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No leads found.
            </div>
          )}

        {!isLoading &&
          !isError &&
          recentLeads.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentLeads.map((lead: Lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      router.push(`/leads/${lead.id}`)
                    }
                  >
                    <TableCell className="font-medium">
                      {lead.name}
                    </TableCell>

                    <TableCell>
                      {lead.phone}
                    </TableCell>

                    <TableCell>
                      <LeadStatusBadge
                        status={lead.status}
                      />
                    </TableCell>

                    <TableCell>
                      {lead.source}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
      </CardContent>
    </Card>
  );
}