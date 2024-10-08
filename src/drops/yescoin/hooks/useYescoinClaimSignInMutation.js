import { useMutation } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinClaimSignInMutation() {
  const api = useYescoinApi();
  return useMutation({
    mutationKey: ["yescoin", "sign-in", "claim"],
    mutationFn: ({ headers, body }) =>
      api
        .post("https://api-backend.yescoin.gold/signIn/claim", body, {
          headers,
        })
        .then((res) => res.data.data),
  });
}
