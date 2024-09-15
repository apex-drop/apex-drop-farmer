import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useGoatsAuth from "./useGoatsAuth";

export default function useGoatsMissionsQuery() {
  const Authorization = useGoatsAuth();
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["goats", "missions"],
    queryFn: ({ signal }) =>
      axios
        .get("https://api-mission.goatsbot.xyz/missions/user", {
          signal,
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });
}
