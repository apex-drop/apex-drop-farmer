import { useQuery } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumDailyRewardQuery() {
  const api = useBlumApi();

  return useQuery({
    queryKey: ["blum", "daily-reward", "get"],
    queryFn: ({ signal }) =>
      api
        .get("https://game-domain.blum.codes/api/v1/daily-reward?offset=-60", {
          signal,
        })
        .then((res) => res.data),
  });
}
