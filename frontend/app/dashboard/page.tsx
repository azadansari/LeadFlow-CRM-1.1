import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="mt-5">
        <StatsGrid />
      </div>
    </DashboardLayout>
  );
}