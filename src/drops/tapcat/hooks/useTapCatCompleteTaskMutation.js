import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTapCatAuth from "./useTapCatAuth";

export default function useTapCatCompleteTaskMutation() {
  const Authorization = useTapCatAuth();
  return useMutation({
    mutationKey: ["tapcat", "task", "complete"],
    mutationFn: (id) =>
      axios
        .post(`https://cat-backend.pro/v1/tasks/comeplete-task/${id}`, null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
