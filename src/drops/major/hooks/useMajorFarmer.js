import useDropFarmer from "@/hooks/useDropFarmer";

import MajorIcon from "../assets/images/icon.png?format=webp";

export default function useMajorFarmer() {
  return useDropFarmer({
    urls: ["*://major.bot/*"],
    notification: {
      id: "major-auth",
      icon: MajorIcon,
      title: "Major Farmer",
      message: "Major Auth Detected",
    },
  });
}
