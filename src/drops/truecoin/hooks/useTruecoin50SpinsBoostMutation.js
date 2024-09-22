import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useTruecoinAuth from "./useTruecoinAuth";

export default function useTruecoin50SpinsBoost() {
  const Authorization = useTruecoinAuth();
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
              Authorization,
            },
          }
        )
        .then((res) => res.data),
  });
}
