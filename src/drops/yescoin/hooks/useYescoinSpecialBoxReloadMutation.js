import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinSpecialBoxReloadMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "special-box", "reload"],
    mutationFn: () =>
      api
        .post(
          "https://api-backend.yescoin.gold/game/specialBoxReloadPage",
          null,
          {
            headers: { "content-type": "application/json" },
          }
        )
        .then((res) => res.data.data),
  });
}
