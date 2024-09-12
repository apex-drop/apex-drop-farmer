import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301TasksQuery() {
  const Authorization = useAgent301Auth();
  return useQuery({
    queryKey: ["agent301", "tasks"],
    queryFn: () =>
      axios
        .post("https://api.agent301.org/getTasks", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
