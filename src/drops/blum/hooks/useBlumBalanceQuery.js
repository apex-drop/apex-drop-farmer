import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumBalanceQuery() {
  const auth = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "balance"],
    queryFn: () =>
      axios
        .get("https://game-domain.blum.codes/api/v1/user/balance", {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}