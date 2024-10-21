import useDropFarmer from "@/hooks/useDropFarmer";
import useRequestData from "@/hooks/useRequestData";
import { useMemo } from "react";

import BirdTonIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useBirdTonFarmer() {
  const farmer = useDropFarmer({
    id: "birdton",
    host: "birdton.site",
    notification: {
      icon: BirdTonIcon,
      title: "BirdTon Farmer",
    },
    domains: ["birdton.site"],
  });

  const [user, setUser] = useRequestData(
    "https://birdton.site/auth",
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
