import { useQuery } from "@tanstack/react-query";

import useNotPixelApi from "./useNotPixelApi";

export default function useNotPixelUserQuery(options) {
  const api = useNotPixelApi();
  return useQuery({
    ...options,
    queryKey: ["notpx", "user"],
    queryFn: ({ signal }) =>
      api
        .get("https://notpx.app/api/v1/users/me", {
          signal,
        })
        .then((res) => res.data),
  });
}
