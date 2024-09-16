import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import TomarketIcon from "../assets/images/icon.png?format=webp";

export default function useTomarketAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://api-web.tomarket.ai/*"],
    notification: {
      id: "tomarket-auth",
      icon: TomarketIcon,
      title: "Tomarket Farmer",
      message: "Tomarket Auth Detected",
    },
  });
}
