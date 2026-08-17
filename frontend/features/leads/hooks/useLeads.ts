"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { LeadService } from "@/services/lead.service";

export function useLeads() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlStatus = searchParams.get("status") || "all";
  const urlPage = Number(
    searchParams.get("page") || "1"
  );

  const [search, setSearch] = useState(urlSearch);
  const [status, setStatus] = useState(urlStatus);
  const [page, setPage] = useState(
    Number.isNaN(urlPage) || urlPage < 1
      ? 1
      : urlPage
  );
  const urlSortBy =
    searchParams.get("sortBy") || "createdAt";

  const urlSortOrder =
    searchParams.get("sortOrder") === "asc"
      ? "asc"
      : "desc";

  const [sortBy, setSortBy] =
    useState(urlSortBy);

  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">(
      urlSortOrder
    );

  const [debouncedSearch, setDebouncedSearch] =
    useState(urlSearch);

  const limit = 10;

  /**
   * Update URL
   */
  const updateUrl = (
    nextSearch: string,
    nextStatus: string,
    nextPage: number
  ) => {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set(
        "search",
        nextSearch.trim()
      );
    }

    if (nextStatus !== "all") {
      params.set(
        "status",
        nextStatus
      );
    }

    if (nextPage > 1) {
      params.set(
        "page",
        String(nextPage)
      );
    }

    const queryString =
      params.toString();

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  /**
   * Sync URL values when URL changes
   */
  useEffect(() => {
    setSearch(urlSearch);
    setStatus(urlStatus);

    const nextPage =
      Number.isNaN(urlPage) || urlPage < 1
        ? 1
        : urlPage;

    setPage(nextPage);
    setDebouncedSearch(urlSearch);
  }, [
    urlSearch,
    urlStatus,
    urlPage,
  ]);

  /**
   * Debounce search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch =
        search.trim();

      setDebouncedSearch(
        trimmedSearch
      );

      setPage(1);

      updateUrl(
        trimmedSearch,
        status,
        1
      );
    }, 400);

    return () =>
      clearTimeout(timer);
  }, [search]);

  /**
   * Fetch leads
   */
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "leads",
      page,
      limit,
      debouncedSearch,
      status,
      sortBy,
      sortOrder,
    ],

    queryFn: () =>
      LeadService.getAll({
        page,
        limit,
        search: debouncedSearch,
        status,
        sortBy,
        sortOrder,
      }),
  });

  const leads = data?.data ?? [];
  const pagination = data?.pagination;

  /**
   * Search
   */
  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  /**
   * Status
   */
  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value);
    setPage(1);

    updateUrl(
      search,
      value,
      1
    );
  };
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((current) =>
        current === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }

    setPage(1);
  };

  /**
   * Next page
   */
  const goToNextPage = () => {
    if (
      pagination &&
      page < pagination.totalPages
    ) {
      const nextPage =
        page + 1;

      setPage(nextPage);

      updateUrl(
        search,
        status,
        nextPage
      );
    }
  };

  /**
   * Previous page
   */
  const goToPreviousPage = () => {
    if (page > 1) {
      const previousPage =
        page - 1;

      setPage(previousPage);

      updateUrl(
        search,
        status,
        previousPage
      );
    }
  };

  return {
    leads,
    search,
    setSearch: handleSearchChange,
    status,
    setStatus: handleStatusChange,

    page,
    setPage,
    limit,
    pagination,

    sortBy,
    sortOrder,
    handleSort,

    isLoading,
    isError,
    error,
    refetch,

    goToNextPage,
    goToPreviousPage,
  };
}