import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useTapCatAuth from "./useTapCatAuth";

export default function useTapCatProfileQuery() {
  const Authorization = useTapCatAuth();
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["tapcat", "profile"],
    queryFn: ({ signal }) =>
      axios
        .get("https://cat-backend.pro/v1/auth/profile", {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
