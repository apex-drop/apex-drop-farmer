import { useMutation } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaCompleteMissionMutation() {
  const api = useTadaApi();
  return useMutation({
    mutationKey: ["tada", "mission", "complete"],
    mutationFn: (id) =>
      api
        .post(
          `https://backend.clutchwalletserver.xyz/activity/v3/missions/${id}/claim`,
          null
        )
        .then((res) => res.data),
  });
}
