import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useTapCatAuth from "./useTapCatAuth";

export default function useTapCatInfoQuery() {
  const Authorization = useTapCatAuth();
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["tapcat", "info"],
    queryFn: ({ signal }) =>
      axios
        .post("https://api.tapcat.app/v1/clicker/api/info", null, {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
