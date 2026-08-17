import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentLeadsTable from "@/components/dashboard/RecentLeadsTable";
import LeadStatusOverview from "@/components/dashboard/LeadStatusOverview";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="mt-2 space-y-8 p-4">
        <StatsGrid />
        <LeadStatusOverview />
        <RecentLeadsTable />
      </div>
    </DashboardLayout>
  );
}