import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsClaimFreeSpinMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "free-spin", "claim"],
    mutationFn: () =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/lottery/free_spin/claim?access_token=${token}`,
          null
        )
        .then((res) => res.data),
  });
}
