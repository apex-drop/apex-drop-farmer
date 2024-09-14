import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useMajorAuth from "./useMajorAuth";

export default function useMajorTasksQuery(daily = false) {
  const Authorization = useMajorAuth();

  return useQuery({
    queryKey: ["major", "tasks", daily],
    queryFn: ({ signal }) =>
      axios
        .get(`https://major.bot/api/tasks/?is_daily=${daily}`, {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
