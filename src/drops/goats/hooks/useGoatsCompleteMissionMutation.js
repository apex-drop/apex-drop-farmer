import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import useGoatsApi from "./useGoatsApi";

export default function useGoatsCompleteMissionMutation() {
  const api = useGoatsApi();
  return useMutation({
    mutationKey: ["goats", "mission", "complete"],
    mutationFn: (id) =>
      delay(2000)
        .then(() =>
          api.post(`https://dev-api.goatsbot.xyz/missions/action/${id}`, null)
        )
        .then((res) => res.data),
  });
}
