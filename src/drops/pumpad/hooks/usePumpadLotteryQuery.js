import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import usePumpadAuth from "./usePumpadAuth";

export default function usePumpadLotteryQuery() {
  const Authorization = usePumpadAuth();
  return useQuery({
    queryKey: ["pumpad", "lottery"],
    queryFn: () =>
      axios
        .get("https://tg.pumpad.io/referral/api/v1/lottery", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}