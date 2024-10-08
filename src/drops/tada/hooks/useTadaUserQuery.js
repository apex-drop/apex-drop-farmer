import { useQuery } from "@tanstack/react-query";

import useTadaApi from "./useTadaApi";

export default function useTadaUserQuery() {
  const api = useTadaApi();
  return useQuery({
    queryKey: ["tada", "user"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-me.tadabot.xyz/users/me", {
          signal,
          withCredentials: true,
        })
        .then((res) => res.data),
  });
}
