import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import useMajorApi from "./useMajorApi";

export default function useMajorClaimTaskMutation() {
  const api = useMajorApi();

  return useMutation({
    mutationKey: ["major", "task", "claim"],
    mutationFn: (id) =>
      delay(1000)
        .then(() => api.post("https://major.bot/api/tasks/", { task_id: id }))
        .then((res) => res.data),
  });
}
