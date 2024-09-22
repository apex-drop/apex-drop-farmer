import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import TruecoinIcon from "../assets/images/icon.png?format=webp";

export default function useTruecoinAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://api.true.world/*"],
    notification: {
      id: "truecoin-auth",
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
      message: "Truecoin Auth Detected",
    },
  });
}
