import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTomarketAuth from "./useTomarketAuth";

export default function useTomarketStartGameMutation(id) {
  const auth = useTomarketAuth();
  return useMutation({
    mutationKey: ["tomarket", "game", "start", id],
    mutationFn: () =>
      axios
        .post(
          "https://api-web.tomarket.ai/tomarket-game/v1/game/play",
          { game_id: id },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data.data),
  });
}
