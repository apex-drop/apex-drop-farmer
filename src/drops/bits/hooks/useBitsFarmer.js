import useDropFarmer from "@/hooks/useDropFarmer";
import useRequestData from "@/hooks/useRequestData";
import { useMemo } from "react";

import BitsIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useBitsFarmer() {
  const farmer = useDropFarmer({
    id: "bits",
    host: "bits.apps-tonbox.me",
    notification: {
      icon: BitsIcon,
      title: "Bits Farmer",
    },
    domains: ["api-bits.apps-tonbox.me"],
  });

  const [user, setUser] = useRequestData(
    "https://api-bits.apps-tonbox.me/api/v1/auth",
    farmer.port
  );

  return useMemo(
    () => ({
      ...farmer,
      user,
      setUser,
    }),
    [farmer, user, setUser]
  );
}
