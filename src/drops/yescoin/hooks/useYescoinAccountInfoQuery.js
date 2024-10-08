import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinAccountInfoQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "account", "info"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/account/getAccountInfo", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
