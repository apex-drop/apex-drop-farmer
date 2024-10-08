import { useQuery } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaCheckInQuery() {
  const api = useTadaApi();
  return useQuery({
    queryKey: ["tada", "check-in"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-checkin.tadabot.xyz/checkin/user", {
          signal,
          withCredentials: true,
        })
        .then((res) => res.data),
  });
}
