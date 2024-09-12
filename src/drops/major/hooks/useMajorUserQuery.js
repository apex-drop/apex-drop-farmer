import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useMajorAuth from "./useMajorAuth";

export default function useMajorUserQuery() {
  const Authorization = useMajorAuth();
  const streakQuery = useQuery({
    queryKey: ["major", "streak"],
    queryFn: () =>
      axios
        .get("https://major.bot/api/user-visits/streak/", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });

  const userQuery = useQuery({
    enabled: streakQuery.isSuccess,
    queryKey: ["major", "user", streakQuery.data?.["user_id"]],
    queryFn: () =>
      axios
        .get(`https://major.bot/api/users/${streakQuery.data?.["user_id"]}/`, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });

  return userQuery;
}
