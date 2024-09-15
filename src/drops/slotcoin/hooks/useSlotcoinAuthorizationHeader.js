import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import SlotcoinIcon from "../assets/images/icon.png?format=webp";

export default function useSlotcoinAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://api.slotcoin.app/*"],
    notification: {
      id: "slotcoin-auth",
      icon: SlotcoinIcon,
      title: "Slotcoin Farmer",
      message: "Slotcoin Auth Detected",
    },
  });
}
