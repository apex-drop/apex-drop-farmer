import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinClaimMissionMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "mission", "claim"],
    mutationFn: (id) =>
      api
        .post("https://api-backend.yescoin.gold/mission/claimReward", id, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => res.data.data),
  });
}
