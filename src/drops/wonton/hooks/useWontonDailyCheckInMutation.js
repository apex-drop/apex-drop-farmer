import { useMutation } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonDailyCheckInMutation() {
  const api = useWontonApi();
  return useMutation({
    mutationKey: ["wonton", "daily-check-in"],
    mutationFn: () =>
      api.get("https://wonton.food/api/v1/checkin").then((res) => res.data),
  });
}
