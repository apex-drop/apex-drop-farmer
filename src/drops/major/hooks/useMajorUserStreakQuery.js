import { useQuery } from "@tanstack/react-query";

import useMajorApi from "./useMajorApi";

export default function useMajorUserStreakQuery() {
  const api = useMajorApi();
  return useQuery({
    refetchInterval: false,
    queryKey: ["major", "user-visits", "streak"],
    queryFn: ({ signal }) =>
      api
        .get("https://major.bot/api/user-visits/streak/", {
          signal,
        })
        .then((res) => res.data),
  });
}
