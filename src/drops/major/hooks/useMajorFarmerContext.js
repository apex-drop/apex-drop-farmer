import { useContext } from "react";

import MajorFarmerContext from "../context/MajorFarmerContext";

export default function useMajorFarmerContext() {
  return useContext(MajorFarmerContext);
}
