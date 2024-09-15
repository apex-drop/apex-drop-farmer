import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useGoatsAuth from "./useGoatsAuth";

export default function useGoatsUserQuery() {
  const Authorization = useGoatsAuth();
  return useQuery({
    queryKey: ["goats", "user"],
    queryFn: ({ signal }) =>
      axios
        .get("https://api-me.goatsbot.xyz/users/me", {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
