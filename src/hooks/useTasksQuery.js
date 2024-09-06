import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

export default function useTasksQuery() {
  const auth = useAuth();
  return useQuery({
    queryKey: ["tasks"],
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
