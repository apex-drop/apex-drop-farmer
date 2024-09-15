import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useAgent301Auth from "./useAgent301Auth";

export default function useAgent301WheelQuery() {
  const Authorization = useAgent301Auth();
  return useQuery({
    queryKey: ["agent301", "wheel"],
    queryFn: ({ signal }) =>
      axios
        .post("https://api.agent301.org/wheel/load", null, {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
