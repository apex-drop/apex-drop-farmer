import { useIsMutating, useQuery } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumBalanceQuery() {
  const api = useBlumApi();
  const isMutating = useIsMutating({ mutationKey: ["blum"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 10000 : false,
    queryKey: ["blum", "balance"],
    queryFn: ({ signal }) =>
      api
        .get("https://game-domain.blum.codes/api/v1/user/balance", {
          signal,
        })
        .then((res) => res.data),
  });
}
