import useDropFarmer from "@/hooks/useDropFarmer";

import TapCatIcon from "../assets/images/icon.png?format=webp";

export default function useTapCatFarmer() {
  return useDropFarmer({
    id: "tapcat",
    urls: ["*://cat-backend.pro/*"],
    notification: {
      icon: TapCatIcon,
      title: "Tap Cat Farmer",
      message: "Tap Cat Auth Detected",
    },
  });
}
