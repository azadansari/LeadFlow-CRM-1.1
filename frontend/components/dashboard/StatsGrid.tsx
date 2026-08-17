"use client";

import { useQuery } from "@tanstack/react-query";
import StatCard from "./StatCard";
import { LeadService } from "@/services/lead.service";
import {
  Users,
  UserPlus,
  CalendarClock,
  BadgeCheck,
} from "lucide-react";

export default function StatsGrid() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lead-stats"],
    queryFn: LeadService.getStats,
  });

  const dashboardStats = [
    {
      title: "Total Leads",
      value: isLoading
        ? "..."
        : String(stats?.totalLeads ?? 0),
      icon: Users,
    },
    {
      title: "Today's Leads",
      value: isLoading
        ? "..."
        : String(stats?.todaysLeads ?? 0),
      icon: UserPlus,
    },
    {
      title: "Follow-ups",
      value: isLoading
        ? "..."
        : String(stats?.followUps ?? 0),
      icon: CalendarClock,
    },
    {
      title: "Converted",
      value: isLoading
        ? "..."
        : String(stats?.converted ?? 0),
      icon: BadgeCheck,
    },
  ];

  if (isError) {
    return (
      <div className="rounded-lg border p-6 text-center text-red-500">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}