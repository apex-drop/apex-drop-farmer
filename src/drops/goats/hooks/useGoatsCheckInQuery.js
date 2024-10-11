import { useQuery } from "@tanstack/react-query";

import useGoatsApi from "./useGoatsApi";

export default function useGoatsCheckInQuery() {
  const api = useGoatsApi();
  return useQuery({
    queryKey: ["goats", "check-in"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-checkin.goatsbot.xyz/checkin/user", {
          signal,
        })
        .then((res) => res.data),
  });
}
