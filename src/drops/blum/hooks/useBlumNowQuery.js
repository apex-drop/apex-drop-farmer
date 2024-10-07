import { useQuery } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumNowQuery() {
  const api = useBlumApi();
  return useQuery({
    refetchInterval: 10000,
    queryKey: ["blum", "now"],
    queryFn: ({ signal }) =>
      api
        .get("https://game-domain.blum.codes/api/v1/time/now", {
          signal,
        })
        .then((res) => res.data),
  });
}
