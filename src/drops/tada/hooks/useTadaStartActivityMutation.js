import { useMutation } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaStartActivityMutation() {
  const api = useTadaApi();
  return useMutation({
    mutationKey: ["tada", "activity", "start"],
    mutationFn: (activity) =>
      api
        .post(
          `https://backend.clutchwalletserver.xyz/activity/v3/activities/${activity}`,
          null
        )
        .then((res) => res.data),
  });
}
