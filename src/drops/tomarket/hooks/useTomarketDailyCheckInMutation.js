import { useMutation } from "@tanstack/react-query";

import useTomarketApi from "./useTomarketApi";

export default function useTomarketDailyCheckInMutation() {
  const api = useTomarketApi();
  return useMutation({
    mutationKey: ["tomarket", "daily", "check-in"],
    mutationFn: (id) =>
      api
        .post("https://api-web.tomarket.ai/tomarket-game/v1/daily/claim", {
          game_id: id,
        })
        .then((res) => res.data),
  });
}
