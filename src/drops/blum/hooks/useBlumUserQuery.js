import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumUserQuery() {
  const Authorization = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "user"],
    queryFn: ({ signal }) =>
      axios
        .get("https://user-domain.blum.codes/api/v1/user/me", {
          signal,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
