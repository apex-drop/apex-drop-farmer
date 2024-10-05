import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";

import useHrumFarmerContext from "./useHrumFarmerContext";
import { getHrumHeaders } from "../lib/utils";

export default function useHrumDataQueries() {
  const { api, telegramWebApp } = useHrumFarmerContext();
  const combine = useCallback((results) => {
    return {
      query: results,
      data: results.map((result) => result.data),
      isPending: results.some((result) => result.isPending),
      isError: results.some((result) => result.isError),
      isSuccess: results.some((result) => result.isSuccess),
    };
  }, []);

  return useQueries({
    combine,
    queries: [
      {
        refetchInterval: 10_000,
        queryKey: ["hrum", "all"],
        queryFn: ({ signal }) => {
          const body = {
            data: {},
          };

          return api
            .post("https://api.hrum.me/user/data/all", body, {
              signal,
              headers: getHrumHeaders(
                body,
                telegramWebApp.initDataUnsafe["hash"]
              ),
            })
            .then((res) => res.data.data);
        },
      },
      {
        refetchInterval: 10_000,
        queryKey: ["hrum", "after"],
        queryFn: ({ signal }) => {
          const body = {
            data: { lang: "en" },
          };

          return api
            .post("https://api.hrum.me/user/data/after", body, {
              signal,
              headers: getHrumHeaders(
                body,
                telegramWebApp.initDataUnsafe["hash"]
              ),
            })
            .then((res) => res.data.data);
        },
      },
    ],
  });
}
