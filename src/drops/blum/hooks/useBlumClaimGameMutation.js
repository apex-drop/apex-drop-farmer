import { useMutation } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumClaimGameMutation() {
  const api = useBlumApi();
  return useMutation({
    mutationKey: ["blum", "game", "claim"],
    mutationFn: (payload) =>
      api
        .post("https://game-domain.blum.codes/api/v2/game/claim", {
          payload,
        })
        .then((res) => res.data),
  });
}
