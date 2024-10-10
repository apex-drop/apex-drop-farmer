import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsStartSocialTaskMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "social-task", "start"],
    mutationFn: ({ name, adId = null }) =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/socialtask/start?access_token=${token}`,
          {
            name,
            adId,
          }
        )
        .then((res) => res.data),
  });
}
