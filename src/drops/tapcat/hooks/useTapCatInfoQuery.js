import { useQuery } from "@tanstack/react-query";

import useTapCatApi from "./useTapCatApi";

export default function useTapCatInfoQuery() {
  const api = useTapCatApi();
  return useQuery({
    queryKey: ["tapcat", "info"],
    queryFn: ({ signal }) =>
      api
        .post("https://api.tapcat.app/v1/clicker/api/info", null, {
          signal,
        })
        .then((res) => res.data),
  });
}
