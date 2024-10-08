import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonClaimFarmingMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "farming", "claim"],
    mutationFn: () =>
      api
        .post("https://game-domain.wonton.codes/api/v1/farming/claim", null)
        .then((res) => res.data),
  });
}
