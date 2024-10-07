import { useMutation } from "@tanstack/react-query";

import useGoatsApi from "./useGoatsApi";

export default function useGoatsCheckInMutation() {
  const api = useGoatsApi();
  return useMutation({
    mutationKey: ["goats", "check-in", "complete"],
    mutationFn: (id) =>
      api
        .post(`https://api-checkin.goatsbot.xyz/checkin/action/${id}`, null)
        .then((res) => res.data),
  });
}
