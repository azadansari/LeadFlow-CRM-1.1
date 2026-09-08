import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LeadService } from "@/services/lead.service";
import LeadDetails from "@/components/leads/LeadDetails";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function LeadDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;
  let lead;
  try {
    lead = await LeadService.getById(id);
  } catch {
    lead = null;
  }
  if (!lead) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Lead not found
        </h1>
        <p className="mt-2 text-gray-500">
          The lead you are looking for does not exist.
        </p>
        <Link href="/leads">
          <Button className="mt-4">
            <ArrowLeft />
            Back to Leads
          </Button>
        </Link>
      </div>
    );
  }
  return <LeadDetails lead={lead} />;
}