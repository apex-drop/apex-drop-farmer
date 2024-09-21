import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useTapCatAuth from "./useTapCatAuth";

export default function useTapCatTasksQuery() {
  const Authorization = useTapCatAuth();
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["tapcat", "tasks"],
    queryFn: ({ signal }) =>
      axios
        .get("https://cat-backend.pro/v1/tasks/available-tasks", {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
