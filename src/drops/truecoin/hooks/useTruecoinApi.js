import { useContext } from "react";

import TruecoinFarmerContext from "../context/TruecoinFarmerContext";

export default function useTruecoinApi() {
  return useContext(TruecoinFarmerContext).api;
}
