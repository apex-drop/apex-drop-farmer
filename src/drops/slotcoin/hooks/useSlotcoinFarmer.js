import useDropFarmer from "@/hooks/useDropFarmer";

import SlotcoinIcon from "../assets/images/icon.png?format=webp";

export default function useSlotcoinFarmer() {
  return useDropFarmer({
    urls: ["*://api.slotcoin.app/*"],
    notification: {
      id: "slotcoin-auth",
      icon: SlotcoinIcon,
      title: "Slotcoin Farmer",
      message: "Slotcoin Auth Detected",
    },
  });
}
