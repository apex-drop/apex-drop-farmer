import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinCollectCoinMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "coin", "collect"],
    mutationFn: (amount) =>
      api
        .post("https://api-backend.yescoin.gold/game/collectCoin", amount, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => res.data.data),
  });
}
