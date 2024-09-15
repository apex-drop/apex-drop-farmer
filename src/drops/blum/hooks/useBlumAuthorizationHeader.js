import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import BlumIcon from "../assets/images/icon.png?format=webp";

export default function useBlumAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: [
      "*://user-domain.blum.codes/*",
      "*://earn-domain.blum.codes/*",
      "*://game-domain.blum.codes/*",
    ],
    notification: {
      id: "blum-auth",
      icon: BlumIcon,
      title: "Blum Farmer",
      message: "Blum Auth Detected",
    },
  });
}
