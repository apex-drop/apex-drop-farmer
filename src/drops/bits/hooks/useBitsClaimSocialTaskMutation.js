import { useMutation } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsClaimSocialTaskMutation() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useMutation({
    mutationKey: ["bits", "social-task", "claim"],
    mutationFn: ({ name }) =>
      api
        .post(
          `https://api-bits.apps-tonbox.me/api/v1/socialtask/claim?access_token=${token}`,
          {
            name,
          }
        )
        .then((res) => res.data),
  });
}
