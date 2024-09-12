import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301LotteryMutation() {
  const Authorization = useAgent301Auth();
  return useMutation({
    mutationKey: ["agent301", "lottery", "spin"],
    mutationFn: () =>
      axios
        .post(
          "https://api.agent301.org/wheel/spin",
          {},
          {
            withCredentials: true,
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => res.data),
  });
}
