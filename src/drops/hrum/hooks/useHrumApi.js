import { useContext } from "react";

import HrumFarmerContext from "../context/HrumFarmerContext";

export default function useHrumApi() {
  return useContext(HrumFarmerContext).api;
}
