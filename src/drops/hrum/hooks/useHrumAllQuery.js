import { useQuery } from "@tanstack/react-query";

import useHrumFarmerContext from "./useHrumFarmerContext";
import { getHrumHeaders } from "../lib/utils";

export default function useHrumAllQuery() {
  const { api, telegramWebApp } = useHrumFarmerContext();

  return useQuery({
    queryKey: ["hrum", "all"],
    queryFn: ({ signal }) => {
      const body = {};

      return api
        .post("https://api.hrum.me/user/data/all", body, {
          signal,
          headers: getHrumHeaders(body, telegramWebApp.initDataUnsafe["hash"]),
        })
        .then((res) => res.data.data);
    },
  });
}
