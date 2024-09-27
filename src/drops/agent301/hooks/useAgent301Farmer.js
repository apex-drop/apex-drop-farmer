import useDropFarmer from "@/hooks/useDropFarmer";

import Agent301Icon from "../assets/images/icon.png?format=webp";

export default function useAgent301Farmer() {
  return useDropFarmer({
    id: "agent301",
    urls: ["*://api.agent301.org/*"],
    notification: {
      icon: Agent301Icon,
      title: "Agent301 Farmer",
      message: "Agent301 Auth Detected",
    },
  });
}
