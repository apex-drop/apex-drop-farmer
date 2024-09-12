import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useSlotcoinAuth from "./useSlotcoinAuth";

export default function useSlotcoinLotteryMutation() {
  const Authorization = useSlotcoinAuth();
  return useMutation({
    mutationKey: ["slotcoin", "lottery", "spin"],
    mutationFn: () =>
      axios
        .post("https://api.slotcoin.app/v1/clicker/api/spin", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
