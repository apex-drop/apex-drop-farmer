import useDropFarmer from "@/hooks/useDropFarmer";

import TruecoinIcon from "../assets/images/icon.png?format=webp";

export default function useTruecoinFarmer() {
  return useDropFarmer({
    urls: ["*://api.true.world/*"],
    notification: {
      id: "truecoin-auth",
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
      message: "Truecoin Auth Detected",
    },
  });
}
