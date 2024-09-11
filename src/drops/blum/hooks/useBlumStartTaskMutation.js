import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumStartTaskMutation() {
  const auth = useBlumAuth();
  return useMutation({
    mutationKey: ["task", "start"],
    mutationFn: (id) =>
      axios
        .post(`https://game-domain.blum.codes/api/v1/tasks/${id}/start`, null, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
