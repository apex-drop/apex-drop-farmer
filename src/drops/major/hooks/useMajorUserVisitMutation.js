import { useMutation } from "@tanstack/react-query";

import useMajorApi from "./useMajorApi";

export default function useMajorUserVisitMutation() {
  const api = useMajorApi();
  return useMutation({
    mutationKey: ["major", "user-visits", "visit"],
    mutationFn: () =>
      api
        .post("https://major.bot/api/user-visits/visit/")
        .then((res) => res.data),
  });
}
