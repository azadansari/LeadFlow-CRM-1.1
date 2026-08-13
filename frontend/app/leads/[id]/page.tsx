import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadService } from "@/services/lead.service";
import LeadStatusBadge from "@/components/leads/LeadStatusBadge";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function LeadDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const leads = await LeadService.getAll();

  const lead = leads.find(
    (item) => String(item.id) === String(id)
  );
  if (!lead) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Lead not found
        </h1>
        <Link href="/leads">
          <Button className="mt-4">
            <ArrowLeft />
            Back to Leads
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Link href="/leads">
        <Button variant="outline">
          <ArrowLeft />
          Back to Leads
        </Button>
      </Link>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {lead.name}
          </h1>
          <p className="mt-1 text-gray-500">
            Lead Details
          </p>
        </div>
        <LeadStatusBadge status={lead.status} />
      </div>
      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>
              <p className="mt-1 font-medium">
                {lead.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>
              <p className="mt-1 font-medium">
                {lead.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>
              <p className="mt-1 font-medium">
                {lead.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Source
              </p>
              <p className="mt-1 font-medium">
                {lead.source}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>
              <div className="mt-1">
                <LeadStatusBadge
                  status={lead.status}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}