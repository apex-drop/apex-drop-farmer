import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import PumpadIcon from "../assets/images/icon.png?format=webp";

export default function usePumpadAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://tg.pumpad.io/*"],
    notification: {
      id: "pumpad-auth",
      icon: PumpadIcon,
      title: "Pumpad Farmer",
      message: "Pumpad Auth Detected",
    },
  });
}
