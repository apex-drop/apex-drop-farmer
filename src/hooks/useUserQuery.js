import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useUserQuery() {
  const auth = useAuth();
  return useQuery({
    queryKey: ["user"],
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
