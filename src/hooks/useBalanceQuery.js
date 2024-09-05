import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useBalanceQuery() {
  const auth = useAuth();
  return useQuery({
    queryKey: ["balance"],
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
