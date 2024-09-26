import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import useAgent301Api from "./useAgent301Api";

export default function useAgent301CompleteTaskMutation() {
  const api = useAgent301Api();
  return useMutation({
    mutationKey: ["agent301", "task", "complete"],
    mutationFn: ({ delay: duration = 0, ...data }) =>
      delay(duration)
        .then(() => api.post("https://api.agent301.org/completeTask", data))
        .then((res) => res.data),
  });
}
