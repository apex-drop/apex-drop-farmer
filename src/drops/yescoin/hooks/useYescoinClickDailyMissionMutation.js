import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinClickDailyMissionMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "mission", "daily", "click"],
    mutationFn: (id) =>
      api
        .post(
          "https://api-backend.yescoin.gold/mission/clickDailyMission",
          id,
          {
            headers: { "content-type": "application/json" },
          }
        )
        .then((res) => res.data.data),
  });
}
