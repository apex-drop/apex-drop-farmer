import { useMutation } from "@tanstack/react-query";
import useBirdTonFarmerContext from "./useBirdTonFarmerContext";

export default function useBirdTonClaimDailyRewardMutation() {
  const { api, telegramWebApp } = useBirdTonFarmerContext();
  return useMutation({
    mutationKey: ["birdton", "daily-reward", "claim"],
    mutationFn: () =>
      api
        .post(
          `https://birdton.site/api/claim_daily?auth=${encodeURIComponent(
            JSON.stringify(telegramWebApp)
          )}`,
          null
        )
        .then((res) => res.data),
  });
}
