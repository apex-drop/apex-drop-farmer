import useDropFarmer from "@/hooks/useDropFarmer";

import BitsIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useBitsFarmer() {
  return useDropFarmer({
    id: "bits",
    host: "bits.apps-tonbox.me",
    notification: {
      icon: BitsIcon,
      title: "Bits Farmer",
    },
    domains: ["api-bits.apps-tonbox.me"],
    skipAuth: true,
  });
}
