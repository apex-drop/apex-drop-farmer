import { useMutation } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumClaimFarmingMutation() {
  const api = useBlumApi();
  return useMutation({
    mutationKey: ["blum", "farming", "claim"],
    mutationFn: () =>
      api
        .post("https://game-domain.blum.codes/api/v1/farming/claim", null)
        .then((res) => res.data),
  });
}
