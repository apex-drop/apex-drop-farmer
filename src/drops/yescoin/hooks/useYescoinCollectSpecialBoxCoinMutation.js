import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinCollectSpecialBoxCoinMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "special-box", "collect"],
    mutationFn: ({ boxType, coinCount }) =>
      api
        .post(
          "https://api-backend.yescoin.gold/game/collectSpecialBoxCoin",
          { boxType, coinCount },
          {
            headers: { "content-type": "application/json" },
          }
        )
        .then((res) => res.data.data),
  });
}
