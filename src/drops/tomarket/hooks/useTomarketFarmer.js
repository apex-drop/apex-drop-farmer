import useDropFarmer from "@/hooks/useDropFarmer";

import TomarketIcon from "../assets/images/icon.png?format=webp";

export default function useTomarketFarmer() {
  return useDropFarmer({
    urls: ["*://api-web.tomarket.ai/*"],
    notification: {
      id: "tomarket-auth",
      icon: TomarketIcon,
      title: "Tomarket Farmer",
      message: "Tomarket Auth Detected",
    },
  });
}
