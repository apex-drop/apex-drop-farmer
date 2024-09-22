import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useTomarketAuth from "./useTomarketAuth";

export default function useTomarketHiddenTaskQuery() {
  const Authorization = useTomarketAuth();
  return useQuery({
    queryKey: ["tomarket", "hidden-task"],
    queryFn: ({ signal }) =>
      axios
        .post(
          "https://api-web.tomarket.ai/tomarket-game/v1/tasks/hidden",
          null,
          {
            signal,
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => res.data.data),
  });
}
