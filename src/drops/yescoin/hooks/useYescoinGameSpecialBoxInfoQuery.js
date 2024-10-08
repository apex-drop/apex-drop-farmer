import { useIsMutating, useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinGameSpecialBoxInfoQuery() {
  const api = useYescoinApi();
  const isMutating = useIsMutating({ mutationKey: ["yescoin"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 3000 : false,
    queryKey: ["yescoin", "game", "special-box-info"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/game/getSpecialBoxInfo", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
