import { useIsMutating, useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinAccountInfoQuery() {
  const api = useYescoinApi();
  const isMutating = useIsMutating({ mutationKey: ["yescoin"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 5000 : false,
    queryKey: ["yescoin", "account", "info"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/account/getAccountInfo", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
