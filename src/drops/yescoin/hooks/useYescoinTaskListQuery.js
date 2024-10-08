import { useQuery } from "@tanstack/react-query";

import useYescoinApi from "./useYescoinApi";

export default function useYescoinTaskListQuery() {
  const api = useYescoinApi();
  return useQuery({
    queryKey: ["yescoin", "task", "list"],
    queryFn: ({ signal }) =>
      api
        .get("https://api-backend.yescoin.gold/task/getTaskList", {
          signal,
        })
        .then((res) => res.data.data),
  });
}
