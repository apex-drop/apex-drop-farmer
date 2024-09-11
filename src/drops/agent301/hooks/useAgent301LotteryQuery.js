import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301LotteryQuery() {
  const Authorization = useAgent301Auth();
  return useQuery({
    queryKey: ["agent301", "lottery"],
    queryFn: () =>
      axios
        .get("https://tg.Agent301.io/referral/api/v1/lottery", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
