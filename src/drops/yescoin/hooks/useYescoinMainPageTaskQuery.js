import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinMainPageTaskQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "main-page", "task"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/task/mainPage", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
