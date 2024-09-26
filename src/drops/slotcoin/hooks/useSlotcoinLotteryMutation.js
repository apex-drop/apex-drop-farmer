import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import useSlotcoinApi from "./useSlotcoinApi";

export default function useSlotcoinLotteryMutation() {
  const api = useSlotcoinApi();
  return useMutation({
    mutationKey: ["slotcoin", "lottery", "spin"],
    mutationFn: () =>
      delay(2500)
        .then(() =>
          api.post("https://api.slotcoin.app/v1/clicker/api/spin", null)
        )
        .then((res) => res.data),
  });
}
