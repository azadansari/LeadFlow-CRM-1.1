"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

import LeadForm from "@/components/leads/LeadForm";

export default function NewLeadPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/leads");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/leads">
            <Button variant="outline" size="icon">
              <ArrowLeft />
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              Add New Lead
            </h1>

            <p className="text-sm text-gray-500">
              Create a new lead
            </p>
          </div>
        </div>

        <LeadForm onSuccess={handleSuccess} />
      </div>
    </DashboardLayout>
  );
}