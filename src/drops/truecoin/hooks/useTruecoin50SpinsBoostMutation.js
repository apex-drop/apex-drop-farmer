import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTruecoinAuth from "./useTruecoinAuth";

export default function useTruecoin50SpinsBoost() {
  const auth = useTruecoinAuth();
  return useMutation({
    mutationKey: ["truecoin", "boost", 50, "spins"],
    mutationFn: () =>
      axios
        .post(
          "https://api.true.world/api/boosts/buy",
          { code: "50_ad_additional_spins" },
          {
            withCredentials: true,
            headers: {
              ...auth,
            },
          }
        )
        .then((res) => res.data),
  });
}
