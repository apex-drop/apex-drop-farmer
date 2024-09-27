import useDropFarmer from "@/hooks/useDropFarmer";

import TomarketIcon from "../assets/images/icon.png?format=webp";

export default function useTomarketFarmer() {
  return useDropFarmer({
    id: "tomarket",
    urls: ["*://api-web.tomarket.ai/*"],
    notification: {
      icon: TomarketIcon,
      title: "Tomarket Farmer",
      message: "Tomarket Auth Detected",
    },
  });
}
