import useDropFarmer from "@/hooks/useDropFarmer";

import GoatsIcon from "../assets/images/icon.png?format=webp";

export default function useGoatsFarmer() {
  return useDropFarmer({
    urls: ["*://*.goatsbot.xyz/*"],
    notification: {
      id: "goats-auth",
      icon: GoatsIcon,
      title: "Goats Farmer",
      message: "Goats Auth Detected",
    },
  });
}
