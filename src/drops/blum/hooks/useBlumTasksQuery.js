import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumTasksQuery() {
  const auth = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "tasks"],
    queryFn: ({ signal }) =>
      axios
        .get("https://earn-domain.blum.codes/api/v1/tasks", {
          signal,
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
