import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsCollectPassiveFarmingMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "passive", "collect"],
    mutationFn: () =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/passive/collect?access_token=${token}`,
          null
        )
        .then((res) => res.data),
  });
}
