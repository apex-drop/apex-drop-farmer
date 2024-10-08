import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonClaimTaskMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "task", "claim"],
    mutationFn: (id) =>
      api
        .post("https://wonton.food/api/v1/task/claim", { taskId: id })
        .then((res) => res.data),
  });
}
