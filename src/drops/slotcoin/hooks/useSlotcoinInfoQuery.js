import { useIsMutating, useQuery } from "@tanstack/react-query";

import useSlotcoinApi from "./useSlotcoinApi";

export default function useSlotcoinInfoQuery() {
  const api = useSlotcoinApi();
  const isMutating = useIsMutating({ mutationKey: ["slotcoin"] });

  return useQuery({
    refetchInterval: isMutating < 1 ? 10_000 : false,
    queryKey: ["slotcoin", "info"],
    queryFn: ({ signal }) =>
      api
        .post("https://api.slotcoin.app/v1/clicker/api/info", null, {
          signal,
        })
        .then((res) => res.data),
  });
}
