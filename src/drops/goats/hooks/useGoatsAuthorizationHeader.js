import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import GoatsIcon from "../assets/images/icon.png?format=webp";

export default function useGoatsAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://*.goatsbot.xyz/*"],
    notification: {
      id: "goats-auth",
      icon: GoatsIcon,
      title: "Goats Farmer",
      message: "Goats Auth Detected",
    },
  });
}
