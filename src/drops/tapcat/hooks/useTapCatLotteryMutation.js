import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTapCatAuth from "./useTapCatAuth";

export default function useTapCatLotteryMutation() {
  const Authorization = useTapCatAuth();
  return useMutation({
    mutationKey: ["tapcat", "lottery", "spin"],
    mutationFn: () =>
      axios
        .get("https://cat-backend.pro/v1/games/slots-start", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
