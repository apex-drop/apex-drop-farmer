import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useClaimGameMutation(points) {
  const auth = useAuth();
  return useMutation({
    mutationKey: ["game", "claim", points],
    mutationFn: (id) =>
      axios
        .post(
          "https://game-domain.blum.codes/api/v1/game/claim",
          { gameId: id, points: points + Math.floor(Math.random() * 20) },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data),
  });
}
