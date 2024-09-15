import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import Agent301Icon from "../assets/images/icon.png?format=webp";

export default function useAgent301AuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://api.agent301.org/*"],
    notification: {
      id: "agent301-auth",
      icon: Agent301Icon,
      title: "Agent301 Farmer",
      message: "Agent301 Auth Detected",
    },
  });
}
