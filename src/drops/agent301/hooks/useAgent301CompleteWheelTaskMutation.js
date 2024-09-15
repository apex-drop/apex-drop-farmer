import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301CompleteWheelTaskMutation() {
  const Authorization = useAgent301Auth();
  return useMutation({
    mutationKey: ["agent301", "wheel", "task", "complete"],
    mutationFn: (data) =>
      axios
        .post("https://api.agent301.org/wheel/task", data, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
