import useDropFarmer from "@/hooks/useDropFarmer";

import TapCatIcon from "../assets/images/icon.png?format=webp";

export default function useTapCatFarmer() {
  return useDropFarmer({
    urls: ["*://cat-backend.pro/*"],
    notification: {
      id: "tapcat-auth",
      icon: TapCatIcon,
      title: "Tap Cat Farmer",
      message: "Tap Cat Auth Detected",
    },
  });
}
