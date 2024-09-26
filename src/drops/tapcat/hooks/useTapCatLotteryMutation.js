import { useMutation } from "@tanstack/react-query";
import useTapCatApi from "./useTapCatApi";

export default function useTapCatLotteryMutation() {
  const api = useTapCatApi();
  return useMutation({
    mutationKey: ["tapcat", "lottery", "spin"],
    mutationFn: () =>
      api
        .get("https://cat-backend.pro/v1/games/slots-start")
        .then((res) => res.data),
  });
}
