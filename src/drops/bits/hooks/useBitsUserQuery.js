import { useQuery } from "@tanstack/react-query";

import useBitsApi from "./useBitsApi";
import useBitsToken from "./useBitsToken";

export default function useBitsUserQuery() {
  const api = useBitsApi();
  const token = useBitsToken();

  return useQuery({
    queryKey: ["bits", "user"],
    queryFn: ({ signal }) =>
      api
        .get(
          `https://api-bits.apps-tonbox.me/api/v1/me?access_token=${token}&category=bits_all_time`,
          {
            signal,
          }
        )
        .then((res) => res.data),
  });
}
