import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTruecoinAuth from "./useTruecoinAuth";

export default function useTruecoinLotteryMutation() {
  const auth = useTruecoinAuth();
  return useMutation({
    mutationKey: ["truecoin", "lottery", "spin"],
    mutationFn: () =>
      axios
        .get("https://api.true.world/api/game/roll", {
          withCredentials: true,
          headers: {
            ...auth,
          },
        })
        .then((res) => res.data),
  });
}
