import { useMutation } from "@tanstack/react-query";

import useNotPixelApi from "./useNotPixelApi";

export default function useNotPixelMiningClaimMutation() {
  const api = useNotPixelApi();
  return useMutation({
    mutationKey: ["notpx", "mining", "claim"],
    mutationFn: () =>
      api.get("https://notpx.app/api/v1/mining/claim").then((res) => res.data),
  });
}
