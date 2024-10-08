import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinSignInListQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "sign-in", "list"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/signIn/list", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
