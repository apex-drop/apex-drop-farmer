import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useSlotcoinAuth from "./useSlotcoinAuth";

export default function useSlotcoinInfoQuery() {
  const Authorization = useSlotcoinAuth();
  return useQuery({
    queryKey: ["slotcoin", "info"],
    queryFn: () =>
      axios
        .post("https://api.slotcoin.app/v1/clicker/api/info", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}