import { useIsMutating, useQuery } from "@tanstack/react-query";
import useBlumApi from "./useBlumApi";

export default function useBlumNowQuery() {
  const api = useBlumApi();
  const isMutating = useIsMutating({ mutationKey: ["yescoin"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 10000 : false,
    queryKey: ["blum", "now"],
    queryFn: ({ signal }) =>
      api
        .get("https://game-domain.blum.codes/api/v1/time/now", {
          signal,
        })
        .then((res) => res.data),
  });
}
