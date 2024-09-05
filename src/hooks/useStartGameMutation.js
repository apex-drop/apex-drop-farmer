import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useStartGameMutation() {
  const auth = useAuth();
  return useMutation({
    mutationKey: ["game", "start"],
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
