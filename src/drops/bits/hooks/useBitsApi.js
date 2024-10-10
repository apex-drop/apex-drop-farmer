import { useContext } from "react";

import BitsFarmerContext from "../context/BitsFarmerContext";

export default function useBitsApi() {
  return useContext(BitsFarmerContext).api;
}
