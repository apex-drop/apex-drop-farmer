import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import MajorIcon from "../assets/images/icon.png?format=webp";

export default function useMajorAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://major.bot/*"],
    notification: {
      id: "major-auth",
      icon: MajorIcon,
      title: "Major Farmer",
      message: "Major Auth Detected",
    },
  });
}
