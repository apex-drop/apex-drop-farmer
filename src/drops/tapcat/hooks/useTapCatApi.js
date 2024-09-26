import { useContext } from "react";

import TapCatFarmerContext from "../context/TapCatFarmerContext";

export default function useTapCatApi() {
  return useContext(TapCatFarmerContext).api;
}
