import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumClaimTaskMutation() {
  const Authorization = useBlumAuth();
  return useMutation({
    mutationKey: ["blum", "task", "claim"],
    mutationFn: ({ id }) =>
      axios
        .post(`https://earn-domain.blum.codes/api/v1/tasks/${id}/claim`, null, {
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
