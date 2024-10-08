import { useContext } from "react";

import WontonFarmerContext from "../context/WontonFarmerContext";

export default function useWontonApi() {
  return useContext(WontonFarmerContext).api;
}
