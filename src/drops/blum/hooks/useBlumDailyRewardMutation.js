import { useMutation } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumDailyRewardMutation() {
  const api = useBlumApi();
  return useMutation({
    mutationKey: ["blum", "daily-reward"],
    mutationFn: () =>
      api
        .get("https://game-domain.blum.codes/api/v1/daily-reward?offset=-60")
        .then((res) => res.data),
  });
}
