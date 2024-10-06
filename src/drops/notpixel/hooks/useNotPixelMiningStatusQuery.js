import { useQuery } from "@tanstack/react-query";

import useNotPixelApi from "./useNotPixelApi";

export default function useNotPixelMiningStatusQuery() {
  const api = useNotPixelApi();
  return useQuery({
    queryKey: ["notpx", "mining", "status"],
    queryFn: ({ signal }) =>
      api
        .get("https://notpx.app/api/v1/mining/status", {
          signal,
        })
        .then((res) => res.data),
  });
}
