import { useQuery } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonFarmingStatusQuery() {
  const api = useWontonApi();
  return useQuery({
    queryKey: ["wonton", "farming", "status"],
    queryFn: ({ signal }) =>
      api
        .get("https://wonton.food/api/v1/user/farming-status", {
          signal,
        })
        .then((res) => res.data),
  });
}
