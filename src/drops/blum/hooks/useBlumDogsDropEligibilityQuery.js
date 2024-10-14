import { useQuery } from "@tanstack/react-query";

import useBlumApi from "./useBlumApi";

export default function useBlumDogsDropEligibilityQuery() {
  const api = useBlumApi();
  return useQuery({
    queryKey: ["blum", "dogs-drop", "eligibility"],
    queryFn: ({ signal }) =>
      api
        .get(
          "https://game-domain.blum.codes/api/v2/game/eligibility/dogs_drop",
          {
            signal,
          }
        )
        .then((res) => res.data),
  });
}
