import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301BalanceQuery() {
  const Authorization = useAgent301Auth();
  return useQuery({
    queryKey: ["agent301", "balance"],
    queryFn: ({ signal }) =>
      axios
        .post("https://api.agent301.org/getMe", null, {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
