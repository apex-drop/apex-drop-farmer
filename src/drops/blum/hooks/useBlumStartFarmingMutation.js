import { useMutation } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumStartFarmingMutation() {
  const api = useBlumApi();
  return useMutation({
    mutationKey: ["blum", "farming", "start"],
    mutationFn: () =>
      api
        .post("https://game-domain.blum.codes/api/v1/farming/start", null)
        .then((res) => res.data),
  });
}
