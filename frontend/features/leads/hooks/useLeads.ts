"use client";

import { useMemo, useState } from "react";
import { recentLeads } from "@/constants/leads";

export function useLeads() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredLeads = useMemo(() => {
    return recentLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchesStatus =
        status === "all" || lead.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return {
    leads: filteredLeads,
    search,
    setSearch,
    status,
    setStatus,
  };
}