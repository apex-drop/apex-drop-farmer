import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTomarketAuth from "./useTomarketAuth";

export default function useTomarketClaimTaskMutation() {
  const auth = useTomarketAuth();
  return useMutation({
    mutationKey: ["tomarket", "task", "claim"],
    mutationFn: (id) =>
      axios
        .post(
          "https://api-web.tomarket.ai/tomarket-game/v1/tasks/claim",
          {
            task_id: id,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data.data),
  });
}
