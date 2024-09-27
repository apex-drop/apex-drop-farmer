import useDropFarmer from "@/hooks/useDropFarmer";

import PumpadIcon from "../assets/images/icon.png?format=webp";

export default function usePumpadFarmer() {
  return useDropFarmer({
    id: "pumpad",
    urls: ["*://tg.pumpad.io/*"],
    notification: {
      icon: PumpadIcon,
      title: "Pumpad Farmer",
      message: "Pumpad Auth Detected",
    },
  });
}
