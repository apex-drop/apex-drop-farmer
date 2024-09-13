import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useSlotcoinAuth from "./useSlotcoinAuth";

export default function useSlotcoinInfoQuery() {
  const Authorization = useSlotcoinAuth();
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["slotcoin", "info"],
    queryFn: ({ signal }) =>
      axios
        .post("https://api.slotcoin.app/v1/clicker/api/info", null, {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
