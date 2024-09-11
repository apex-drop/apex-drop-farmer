import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useBlumAuth from "./useBlumAuth";

export default function useBlumTasksQuery() {
  const auth = useBlumAuth();
  return useQuery({
    queryKey: ["blum", "tasks"],
    queryFn: () =>
      axios
        .get("https://game-domain.blum.codes/api/v1/tasks", {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => res.data),
  });
}
