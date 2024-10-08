import { useMutation } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaCheckInMutation() {
  const api = useTadaApi();
  return useMutation({
    mutationKey: ["tada", "check-in", "complete"],
    mutationFn: (id) =>
      api
        .post(`https://api-checkin.tadabot.xyz/checkin/action/${id}`, null)
        .then((res) => res.data),
  });
}
