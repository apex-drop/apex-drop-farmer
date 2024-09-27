import useDropFarmer from "@/hooks/useDropFarmer";

import SlotcoinIcon from "../assets/images/icon.png?format=webp";

export default function useSlotcoinFarmer() {
  return useDropFarmer({
    id: "slotcoin",
    urls: ["*://api.slotcoin.app/*"],
    notification: {
      icon: SlotcoinIcon,
      title: "Slotcoin Farmer",
      message: "Slotcoin Auth Detected",
    },
  });
}
