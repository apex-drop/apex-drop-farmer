import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301BalanceQuery() {
  const Authorization = useAgent301Auth();
  return useQuery({
    queryKey: ["agent301", "balance"],
    queryFn: () =>
      axios
        .post("https://api.agent301.org/getMe", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
