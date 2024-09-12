import { useContext } from "react";

import SlotcoinAuthContext from "../context/SlotcoinAuthContext";

export default function useSlotcoinAuth() {
  return useContext(SlotcoinAuthContext);
}
