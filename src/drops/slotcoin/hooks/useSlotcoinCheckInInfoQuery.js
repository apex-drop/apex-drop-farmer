import { useQuery } from "@tanstack/react-query";

import useSlotcoinApi from "./useSlotcoinApi";

export default function useSlotcoinCheckInInfoQuery() {
  const api = useSlotcoinApi();
  return useQuery({
    queryKey: ["slotcoin", "check-in", "info"],
    queryFn: ({ signal }) =>
      api
        .post("https://api.slotcoin.app/v1/clicker/check-in/info", null, {
          signal,
        })
        .then((res) => res.data),
  });
}
