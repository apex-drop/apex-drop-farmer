import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useGoatsAuth from "./useGoatsAuth";

export default function useGoatsCompleteMissionMutation() {
  const Authorization = useGoatsAuth();
  return useMutation({
    mutationKey: ["goats", "mission", "complete"],
    mutationFn: (id) =>
      axios
        .post(`https://dev-api.goatsbot.xyz/missions/action/${id}`, null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
