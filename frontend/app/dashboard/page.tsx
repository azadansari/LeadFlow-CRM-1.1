import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <DashboardHeader />

      <div className="mt-8">

        <h2 className="text-3xl font-bold">
          Dashboard Overview
        </h2>

      </div>

    </DashboardLayout>
  );
}