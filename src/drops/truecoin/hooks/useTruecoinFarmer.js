import useDropFarmer from "@/hooks/useDropFarmer";

import TruecoinIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useTruecoinFarmer() {
  return useDropFarmer({
    id: "truecoin",
    host: "bot.true.world",
    notification: {
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
    },
    domains: ["*.true.world"],
  });
}
