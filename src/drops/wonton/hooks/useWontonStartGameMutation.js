import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonStartGameMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "game", "start"],
    mutationFn: () =>
      api
        .post("https://wonton.food/api/v1/user/start-game", null)
        .then((res) => res.data),
  });
}
