import useDropFarmer from "@/hooks/useDropFarmer";

import MajorIcon from "../assets/images/icon.png?format=webp";

export default function useMajorFarmer() {
  return useDropFarmer({
    id: "major",
    urls: ["*://major.bot/*"],
    notification: {
      icon: MajorIcon,
      title: "Major Farmer",
      message: "Major Auth Detected",
    },
  });
}
