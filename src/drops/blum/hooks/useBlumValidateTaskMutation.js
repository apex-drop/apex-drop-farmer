import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumValidateTaskMutation() {
  const auth = useBlumAuth();
  return useMutation({
    mutationKey: ["blum", "task", "validate"],
    mutationFn: ({ id, keyword }) =>
      axios
        .post(
          `https://game-domain.blum.codes/api/v1/tasks/${id}/validate`,
          { keyword },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data),
  });
}
