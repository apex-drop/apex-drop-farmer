import { useQuery } from "@tanstack/react-query";

import useTapCatApi from "./useTapCatApi";

export default function useTapCatProfileQuery() {
  const api = useTapCatApi();
  return useQuery({
    queryKey: ["tapcat", "profile"],
    queryFn: ({ signal }) =>
      api
        .get("https://cat-backend.pro/v1/auth/profile", {
          signal,
        })
        .then((res) => res.data),
  });
}
