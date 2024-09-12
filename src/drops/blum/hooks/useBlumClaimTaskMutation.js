import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumClaimTaskMutation() {
  const auth = useBlumAuth();
  return useMutation({
    mutationKey: ["blum", "task", "claim"],
    mutationFn: ({ id }) =>
      axios
        .post(`https://game-domain.blum.codes/api/v1/tasks/${id}/claim`, null, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
