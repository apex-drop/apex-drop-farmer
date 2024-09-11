import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumStartGameMutation() {
  const auth = useBlumAuth();
  return useMutation({
    mutationKey: ["blum", "game", "start"],
    mutationFn: () =>
      axios
        .post("https://game-domain.blum.codes/api/v1/game/play", null, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
