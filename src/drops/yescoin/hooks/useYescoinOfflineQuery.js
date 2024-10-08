import { useIsMutating, useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinOfflineQuery() {
  const api = useYescoinApi();
  const isMutating = useIsMutating({ mutationKey: ["yescoin"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 5000 : false,
    queryKey: ["yescoin", "offline"],
    queryFn: ({ signal }) =>
      api
        .post("https://api-backend.yescoin.gold/user/offline", null, {
          signal,
        })
        .then((res) => res.data.data),
  });
}
