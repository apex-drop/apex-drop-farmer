import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumUserQuery() {
  const auth = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "user"],
    queryFn: () =>
      axios
        .get("https://user-domain.blum.codes/api/v1/user/me", {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
