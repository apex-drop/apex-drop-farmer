import useDropFarmer from "@/hooks/useDropFarmer";

import GoatsIcon from "../assets/images/icon.png?format=webp";

export default function useGoatsFarmer() {
  return useDropFarmer({
    id: "goats",
    urls: ["*://*.goatsbot.xyz/*"],
    notification: {
      icon: GoatsIcon,
      title: "Goats Farmer",
      message: "Goats Auth Detected",
    },
  });
}
