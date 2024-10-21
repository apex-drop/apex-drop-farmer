import useDropFarmer from "@/hooks/useDropFarmer";
import useRequestData from "@/hooks/useRequestData";
import { useMemo } from "react";

import TruecoinIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useTruecoinFarmer() {
  const farmer = useDropFarmer({
    id: "truecoin",
    host: "bot.true.world",
    notification: {
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
    },
    domains: ["*.true.world"],
  });

  const [user, setUser] = useRequestData(
    "https://api.true.world/api/auth/signIn",
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
