import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonStartTaskMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "task", "verify"],
    mutationFn: (id) =>
      api
        .post("https://wonton.food/api/v1/task/verify", { taskId: id })
        .then((res) => res.data),
  });
}