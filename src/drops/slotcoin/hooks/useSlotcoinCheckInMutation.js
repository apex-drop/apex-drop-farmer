import { useMutation } from "@tanstack/react-query";

import useSlotcoinApi from "./useSlotcoinApi";

export default function useSlotcoinCheckInMutation() {
  const api = useSlotcoinApi();
  return useMutation({
    mutationKey: ["slotcoin", "check-in", "claim"],
    mutationFn: () =>
      api
        .post("https://api.slotcoin.app/v1/clicker/check-in/claim", {})
        .then((res) => res.data),
  });
}
