"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";

export function useLeads() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const {
    data: leads = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: LeadService.getAll,
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        lead.name.toLowerCase().includes(searchValue) ||
        lead.phone.includes(searchValue) ||
        lead.email?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" || lead.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, status]);

  return {
    leads: filteredLeads,
    search,
    setSearch,
    status,
    setStatus,
    isLoading,
    isError,
    error,
    refetch,
  };
}