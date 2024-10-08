import { useQuery } from "@tanstack/react-query";

import useWontonApi from "./useWontonApi";

export default function useWontonTasksQuery() {
  const api = useWontonApi();

  return useQuery({
    queryKey: ["wonton", "tasks"],
    queryFn: ({ signal }) =>
      api
        .get("https://wonton.food/api/v1/task/list", {
          signal,
        })
        .then((res) => res.data),
  });
}
