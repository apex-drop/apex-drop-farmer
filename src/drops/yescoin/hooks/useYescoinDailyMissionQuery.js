import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinDailyMissionQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "mission", "daily"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/mission/getDailyMission", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
