import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301CompleteTaskMutation() {
  const Authorization = useAgent301Auth();
  return useMutation({
    mutationKey: ["agent301", "task", "complete"],
    mutationFn: (data) =>
      axios
        .post("https://api.agent301.org/completeTask", data, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
