import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonStartFarmingMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "farming", "start"],
    mutationFn: () =>
      api
        .post("https://wonton.food/api/v1/user/start-farming", null)
        .then((res) => res.data),
  });
}
