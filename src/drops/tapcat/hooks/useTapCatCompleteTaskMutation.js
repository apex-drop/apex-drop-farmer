import { useMutation } from "@tanstack/react-query";
import useTapCatApi from "./useTapCatApi";

export default function useTapCatCompleteTaskMutation() {
  const api = useTapCatApi();
  return useMutation({
    mutationKey: ["tapcat", "task", "complete"],
    mutationFn: (id) =>
      api
        .post(`https://cat-backend.pro/v1/tasks/comeplete-task/${id}`, null)
        .then((res) => res.data),
  });
}
