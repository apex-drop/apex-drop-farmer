import { useQuery } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsDailyRewardQuery() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useQuery({
    queryKey: ["bits", "daily-reward", "list"],
    queryFn: ({ signal }) =>
      api
        .get(
          `https://api-bits.apps-tonbox.me/api/v1/daily-reward?access_token=${token}`,
          {
            signal,
          }
        )
        .then((res) => res.data),
  });
}