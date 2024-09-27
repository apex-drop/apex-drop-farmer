import useDropFarmer from "@/hooks/useDropFarmer";

import TruecoinIcon from "../assets/images/icon.png?format=webp";

export default function useTruecoinFarmer() {
  return useDropFarmer({
    id: "truecoin",
    urls: ["*://api.true.world/*"],
    notification: {
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
      message: "Truecoin Auth Detected",
    },
  });
}
