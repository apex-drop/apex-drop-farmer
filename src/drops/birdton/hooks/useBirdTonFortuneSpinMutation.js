import { useMutation } from "@tanstack/react-query";
import useBirdTonFarmerContext from "./useBirdTonFarmerContext";

export default function useBirdTonFortuneSpinMutation() {
  const { api, telegramWebApp } = useBirdTonFarmerContext();
  return useMutation({
    mutationKey: ["birdton", "fortune", "spin"],
    mutationFn: () =>
      api
        .post(
          `https://birdton.site/api/fortune_spin?auth=${encodeURIComponent(
            JSON.stringify(telegramWebApp)
          )}`,
          null
        )
        .then((res) => res.data),
  });
}
