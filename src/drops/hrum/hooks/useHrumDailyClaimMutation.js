import { useMutation } from "@tanstack/react-query";

import useHrumFarmerContext from "./useHrumFarmerContext";
import { getHrumHeaders } from "../lib/utils";

export default function useHrumDailyClaimMutation() {
  const { api, telegramWebApp } = useHrumFarmerContext();

  return useMutation({
    mutationKey: ["hrum", "quests", "daily", "claim"],
    mutationFn: (data) => {
      const body = {
        data,
      };

      return api
        .post("https://api.hrum.me/quests/daily/claim", body, {
          headers: getHrumHeaders(body, telegramWebApp.initDataUnsafe["hash"]),
        })
        .then((res) => res.data.data);
    },
  });
}