import useDropFarmer from "@/hooks/useDropFarmer";

import BlumIcon from "../assets/images/icon.png?format=webp";

export default function useBlumFarmer() {
  return useDropFarmer({
    urls: [
      "*://user-domain.blum.codes/*",
      "*://earn-domain.blum.codes/*",
      "*://game-domain.blum.codes/*",
    ],
    notification: {
      id: "blum-auth",
      icon: BlumIcon,
      title: "Blum Farmer",
      message: "Blum Auth Detected",
    },
  });
}
