import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTomarketAuth from "./useTomarketAuth";

export default function useTomarketClaimGameMutation(id, points) {
  const Authorization = useTomarketAuth();
  return useMutation({
    mutationKey: ["tomarket", "game", "claim", id, points],
    mutationFn: () =>
      axios
        .post(
          "https://api-web.tomarket.ai/tomarket-game/v1/game/claim",
          {
            game_id: id,
            points: points + Math.floor(Math.random() * 20),
          },
          {
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => res.data.data),
  });
}
