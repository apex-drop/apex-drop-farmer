import { useContext } from "react";

import TadaFarmerContext from "../context/TadaFarmerContext";

export default function useTadaApi() {
  return useContext(TadaFarmerContext).api;
}
