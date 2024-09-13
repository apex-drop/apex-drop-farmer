import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import usePumpadAuth from "./usePumpadAuth";

export default function usePumpadUserQuery() {
  const Authorization = usePumpadAuth();
  return useQuery({
    queryKey: ["pumpad", "user"],
    queryFn: ({ signal }) =>
      axios
        .get("https://tg.pumpad.io/referral/api/v1/tg/user/information", {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
