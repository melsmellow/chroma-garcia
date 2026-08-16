"use client";

import { useEffect, useRef, useState, useTransition } from "react";

interface UseTableControlProps<T> {
  initialData: T;
  initialPage: number;
  initialLimit: number;
  fetchData: (params: {
    page: number;
    limit: number;
    search: string;
  }) => Promise<T>;
}

export function useTableControl<T>({
  initialData,
  initialPage,
  initialLimit,
  fetchData,
}: UseTableControlProps<T>) {
  const isFirstRender = useRef(true);

  const [data, setData] = useState<T>(initialData);

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState("");

  const [isPending, startTransition] = useTransition();

  function fetchTableData({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    startTransition(async () => {
      try {
        const result = await fetchData({
          page,
          limit,
          search,
        });

        setData(result);
      } catch (error) {
        console.error("Failed to fetch table data:", error);
      }
    });
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      setPage(1);

      fetchTableData({
        page: 1,
        limit,
        search,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  function handlePrevious(totalPages: number) {
    if (page <= 1) return;

    const nextPage = page - 1;

    setPage(nextPage);

    fetchTableData({
      page: nextPage,
      limit,
      search,
    });
  }

  function handleNext(totalPages: number) {
    if (page >= totalPages) return;

    const nextPage = page + 1;

    setPage(nextPage);

    fetchTableData({
      page: nextPage,
      limit,
      search,
    });
  }

  function handleLimitChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const nextLimit = Number(event.target.value);

    setLimit(nextLimit);
    setPage(1);

    fetchTableData({
      page: 1,
      limit: nextLimit,
      search,
    });
  }

  function refresh() {
    fetchTableData({
      page,
      limit,
      search,
    });
  }

  return {
    data,
    setData,

    page,
    limit,
    search,
    setSearch,

    isPending,

    fetchTableData,
    refresh,

    handlePrevious,
    handleNext,
    handleLimitChange,
  };
}