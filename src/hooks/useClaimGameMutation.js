import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useClaimGameMutation() {
  const auth = useAuth();
  return useMutation({
    mutationKey: ["game", "claim"],
    mutationFn: (id) =>
      axios
        .post(
          "https://game-domain.blum.codes/api/v1/game/claim",
          { gameId: id, points: 280 + Math.floor(Math.random() * 20) },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data),
  });
}
