import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import usePumpadAuth from "./usePumpadAuth";

export default function usePumpadLotteryMutation() {
  const Authorization = usePumpadAuth();
  return useMutation({
    mutationKey: ["pumpad", "lottery", "spin"],
    mutationFn: () =>
      axios
        .post("https://tg.pumpad.io/referral/api/v1/lottery", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
