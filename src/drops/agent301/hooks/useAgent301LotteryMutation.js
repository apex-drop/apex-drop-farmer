import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import useAgent301Api from "./useAgent301Api";

export default function useAgent301LotteryMutation() {
  const api = useAgent301Api();
  return useMutation({
    mutationKey: ["agent301", "lottery", "spin"],
    mutationFn: () =>
      delay(10_000)
        .then(() => api.post("https://api.agent301.org/wheel/spin", {}))
        .then((res) => res.data),
  });
}
