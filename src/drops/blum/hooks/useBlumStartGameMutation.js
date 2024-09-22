import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumStartGameMutation() {
  const Authorization = useBlumAuth();
  return useMutation({
    mutationKey: ["blum", "game", "start"],
    mutationFn: () =>
      axios
        .post("https://game-domain.blum.codes/api/v1/game/play", null, {
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
