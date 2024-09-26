import { useQuery } from "@tanstack/react-query";

import useTapCatApi from "./useTapCatApi";

export default function useTapCatTasksQuery() {
  const api = useTapCatApi();
  return useQuery({
    queryKey: ["tapcat", "tasks"],
    queryFn: ({ signal }) =>
      api
        .get("https://cat-backend.pro/v1/tasks/available-tasks", {
          signal,
        })
        .then((res) => res.data),
  });
}
