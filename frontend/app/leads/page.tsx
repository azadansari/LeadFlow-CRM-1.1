import DashboardLayout from "@/components/layout/DashboardLayout";

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Leads</h1>

        <p className="text-gray-500">
          Manage all your leads from one place.
        </p>
      </div>
    </DashboardLayout>
  );
}