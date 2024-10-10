import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsCollectDailyRewardMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "daily-reward", "collect"],
    mutationFn: (day) =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/daily-reward/${day}/collect?access_token=${token}`,
          null
        )
        .then((res) => res.data),
  });
}
