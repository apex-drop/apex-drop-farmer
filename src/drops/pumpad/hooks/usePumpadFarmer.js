import useDropFarmer from "@/hooks/useDropFarmer";

import PumpadIcon from "../assets/images/icon.png?format=webp";

export default function usePumpadFarmer() {
  return useDropFarmer({
    urls: ["*://tg.pumpad.io/*"],
    notification: {
      id: "pumpad-auth",
      icon: PumpadIcon,
      title: "Pumpad Farmer",
      message: "Pumpad Auth Detected",
    },
  });
}
