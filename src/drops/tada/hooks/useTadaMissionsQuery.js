import { useQuery } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaMissionsQuery() {
  const api = useTadaApi();
  return useQuery({
    queryKey: ["tada", "missions"],
    queryFn: ({ signal }) =>
      api
        .get(
          "https://backend.clutchwalletserver.xyz/activity/v3/missions?missionGroupId=eea00000-0000-4000-0000-000000000000&excludeAutoClaimable=true",
          {
            signal,
          }
        )
        .then((res) => res.data),
  });
}
