import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useTomarketAuth from "./useTomarketAuth";

export default function useTomarketBalanceQuery() {
  const auth = useTomarketAuth();
  return useQuery({
    queryKey: ["tomarket", "balance"],
    queryFn: ({ signal }) =>
      axios
        .post(
          "https://api-web.tomarket.ai/tomarket-game/v1/user/balance",
          null,
          {
            signal,
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => res.data.data),
  });
}
