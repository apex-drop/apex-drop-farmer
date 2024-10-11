import { useMutation } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumClaimDailyRewardMutation() {
  const api = useBlumApi();
  return useMutation({
    mutationKey: ["blum", "daily-reward", "claim"],
    mutationFn: () =>
      api
        .post(
          "https://game-domain.blum.codes/api/v1/daily-reward?offset=-60",
          null
        )
        .then((res) => res.data),
  });
}
