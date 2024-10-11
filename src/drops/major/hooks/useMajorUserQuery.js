import { useQuery } from "@tanstack/react-query";
import useMajorApi from "./useMajorApi";
import useMajorFarmerContext from "./useMajorFarmerContext";

export default function useMajorUserQuery() {
  const api = useMajorApi();
  const { authQuery } = useMajorFarmerContext();

  const userQuery = useQuery({
    enabled: authQuery.isSuccess,
    queryKey: ["major", "user", authQuery.data?.user?.id],
    queryFn: ({ signal }) =>
      api
        .get(`https://major.bot/api/users/${authQuery.data?.user?.id}/`, {
          signal,
        })
        .then((res) => res.data),
  });

  return userQuery;
}
