import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinWalletQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "wallet"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/wallet/getWallet", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
