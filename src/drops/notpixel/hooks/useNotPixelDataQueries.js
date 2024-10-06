import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";

import useNotPixelApi from "./useNotPixelApi";

export default function useNotPixelDataQueries() {
  const api = useNotPixelApi();

  const combine = useCallback((results) => {
    return {
      query: results,
      data: results.map((result) => result.data),
      isPending: results.some((result) => result.isPending),
      isError: results.some((result) => result.isError),
      isSuccess: results.every((result) => result.isSuccess),
    };
  }, []);

  return useQueries({
    combine,
    queries: [
      {
        refetchInterval: 10_000,
        queryKey: ["notpx", "user"],
        queryFn: ({ signal }) =>
          api
            .get("https://notpx.app/api/v1/users/me", {
              signal,
            })
            .then((res) => res.data),
      },
      {
        refetchInterval: 10_000,
        queryKey: ["notpx", "mining", "status"],
        queryFn: ({ signal }) =>
          api
            .get("https://notpx.app/api/v1/mining/status", {
              signal,
            })
            .then((res) => res.data),
      },
    ],
  });
}
