import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsSpinRollMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "spin", "roll"],
    mutationFn: () =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/spin/roll?access_token=${token}`,
          null
        )
        .then((res) => res.data),
  });
}
