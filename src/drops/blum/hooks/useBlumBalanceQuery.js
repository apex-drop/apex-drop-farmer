import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumBalanceQuery() {
  const Authorization = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "balance"],
    queryFn: ({ signal }) =>
      axios
        .get("https://game-domain.blum.codes/api/v1/user/balance", {
          signal,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
