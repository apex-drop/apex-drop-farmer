import moment from "moment";
import { useMutation } from "@tanstack/react-query";

import useTruecoinApi from "./useTruecoinApi";

export default function useTruecoinLotteryMutation() {
  const api = useTruecoinApi();
  return useMutation({
    mutationKey: ["truecoin", "lottery", "spin"],
    mutationFn: () =>
      api
        .get("https://api.true.world/api/game/roll", {
          headers: {
            downlink: 1.25,
            multiply: 1,
            sendtime: moment.utc().format(),
            referrer: "https://bot.true.world/",
          },
        })
        .then((res) => res.data),
  });
}
