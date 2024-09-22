import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTruecoinAuth from "./useTruecoinAuth";

export default function useTruecoinLotteryMutation() {
  const Authorization = useTruecoinAuth();
  return useMutation({
    mutationKey: ["truecoin", "lottery", "spin"],
    mutationFn: () =>
      axios
        .get("https://api.true.world/api/game/roll", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
