import { useContext } from "react";

import HrumFarmerContext from "../context/HrumFarmerContext";

export default function useHrumFarmerContext() {
  return useContext(HrumFarmerContext);
}
