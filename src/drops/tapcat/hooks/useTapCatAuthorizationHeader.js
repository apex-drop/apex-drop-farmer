import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import TapCatIcon from "../assets/images/icon.png?format=webp";

export default function useTapCatAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://cat-backend.pro/*"],
    notification: {
      id: "tapcat-auth",
      icon: TapCatIcon,
      title: "Tap Cat Farmer",
      message: "Tap Cat Auth Detected",
    },
  });
}
