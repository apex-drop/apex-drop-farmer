import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsStartPassiveFarmingMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "passive", "start"],
    mutationFn: () =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/passive?access_token=${token}`,
          null
        )
        .then((res) => res.data),
  });
}
